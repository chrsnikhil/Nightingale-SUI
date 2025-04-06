module 0x0::wager {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::coin::{Self, Coin};
    use sui::balance::{Self, Balance};
    use sui::sui::SUI;

    /// Represents a wager between two players
    struct Wager has key, store {
        id: UID,
        player1: address,
        player2: address,
        amount: u64,
        status: u8, // 0: waiting, 1: active, 2: completed
        winner: address,
        balance: Balance<SUI>,
    }

    /// Error codes
    const EInvalidAmount: u64 = 1;
    const EInvalidStatus: u64 = 2;
    const ENotPlayer: u64 = 3;
    const EAlreadyJoined: u64 = 4;
    const ENotActive: u64 = 5;
    const ENoWinner: u64 = 6;

    /// Create a new wager
    public entry fun create_wager(
        coin: Coin<SUI>,
        ctx: &mut TxContext
    ) {
        let amount = coin::value(&coin);
        assert!(amount > 0, EInvalidAmount);
        
        let wager = Wager {
            id: object::new(ctx),
            player1: tx_context::sender(ctx),
            player2: @0x0,
            amount,
            status: 0,
            winner: @0x0,
            balance: coin::into_balance(coin),
        };

        // Share the wager object immediately upon creation
        transfer::share_object(wager);
    }

    /// Join an existing wager
    public entry fun join_wager(
        wager: &mut Wager,
        coin: Coin<SUI>,
        ctx: &mut TxContext
    ) {
        assert!(wager.status == 0, EInvalidStatus);
        assert!(wager.player2 == @0x0, EAlreadyJoined);
        assert!(coin::value(&coin) == wager.amount, EInvalidAmount);

        wager.player2 = tx_context::sender(ctx);
        wager.status = 1;
        balance::join(&mut wager.balance, coin::into_balance(coin));
    }

    /// Set the winner of the wager
    public entry fun set_winner(
        wager: &mut Wager,
        winner: address,
        _ctx: &mut TxContext
    ) {
        assert!(wager.status == 1, ENotActive);
        assert!(winner == wager.player1 || winner == wager.player2, ENotPlayer);
        
        wager.winner = winner;
        wager.status = 2;
    }

    /// Claim the winnings
    public entry fun claim_winnings(
        wager: Wager,
        ctx: &mut TxContext
    ) {
        assert!(wager.status == 2, ENotActive);
        assert!(wager.winner != @0x0, ENoWinner);
        assert!(tx_context::sender(ctx) == wager.winner, ENotPlayer);

        let Wager { 
            id, 
            player1: _, 
            player2: _, 
            amount: _, 
            status: _, 
            winner, 
            balance 
        } = wager;

        // Create a coin with the total balance and transfer it to the winner
        let winning_coin = coin::from_balance(balance, ctx);
        transfer::public_transfer(winning_coin, winner);
        object::delete(id);
    }
} 