module nft_store::nft_store {
    use sui::object::{Self, ID, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::balance::{Self, Balance};
    use sui::event;
    use sui::vec_set::{Self, VecSet};

    /// Error codes
    const EInvalidPrice: u64 = 0;
    const EInsufficientFunds: u64 = 1;
    const ENotForSale: u64 = 2;
    const EAlreadyListed: u64 = 3;

    /// Represents an NFT
    struct NFT has key {
        id: UID,
        name: vector<u8>,
        description: vector<u8>,
        image_url: vector<u8>,
        price: u64,
        owner: address,
        is_for_sale: bool,
    }

    /// Events
    struct NFTMinted has copy, drop {
        nft_id: ID,
        name: vector<u8>,
        owner: address,
    }

    struct NFTSold has copy, drop {
        nft_id: ID,
        seller: address,
        buyer: address,
        price: u64,
    }

    struct NFTListed has copy, drop {
        nft_id: ID,
        price: u64,
    }

    /// Create a new NFT
    public fun mint_nft(
        name: vector<u8>,
        description: vector<u8>,
        image_url: vector<u8>,
        ctx: &mut TxContext
    ) {
        let nft = NFT {
            id: object::new(ctx),
            name,
            description,
            image_url,
            price: 0,
            owner: tx_context::sender(ctx),
            is_for_sale: false,
        };

        let nft_id = object::id(&nft);
        transfer::transfer(nft, tx_context::sender(ctx));

        event::emit(NFTMinted {
            nft_id,
            name: name,
            owner: tx_context::sender(ctx),
        });
    }

    /// List an NFT for sale
    public fun list_nft_for_sale(
        nft: &mut NFT,
        price: u64,
        ctx: &mut TxContext
    ) {
        assert!(price > 0, EInvalidPrice);
        assert!(!nft.is_for_sale, EAlreadyListed);
        assert!(nft.owner == tx_context::sender(ctx), 0);

        nft.price = price;
        nft.is_for_sale = true;

        event::emit(NFTListed {
            nft_id: object::id(nft),
            price,
        });
    }

    /// Purchase an NFT
    public fun purchase_nft(
        nft: &mut NFT,
        payment: Coin<SUI>,
        ctx: &mut TxContext
    ) {
        assert!(nft.is_for_sale, ENotForSale);
        assert!(coin::value(&payment) >= nft.price, EInsufficientFunds);

        let payment_value = coin::value(&payment);
        let seller = nft.owner;
        let buyer = tx_context::sender(ctx);

        // Transfer the NFT to the buyer
        nft.owner = buyer;
        nft.is_for_sale = false;
        nft.price = 0;

        // Transfer payment to the seller
        let payment_balance = coin::into_balance(payment);
        let seller_payment = coin::from_balance(balance::split(&mut payment_balance, nft.price), ctx);
        transfer::transfer(seller_payment, seller);

        event::emit(NFTSold {
            nft_id: object::id(nft),
            seller,
            buyer,
            price: nft.price,
        });
    }

    /// Get NFT details
    public fun get_nft_details(nft: &NFT): (vector<u8>, vector<u8>, vector<u8>, u64, address, bool) {
        (nft.name, nft.description, nft.image_url, nft.price, nft.owner, nft.is_for_sale)
    }
} 