
import random


def display_board(board):
    print('\n'*100)
    print('   |   |')
    print(' ' + board[7] + ' | ' + board[8] + ' | ' + board[9])
    print('   |   |')
    print('-----------')
    print('   |   |')
    print(' ' + board[4] + ' | ' + board[5] + ' | ' + board[6])
    print('   |   |')
    print('-----------')
    print('   |   |')
    print(' ' + board[1] + ' | ' + board[2] + ' | ' + board[3])
    print('   |   |')


def player_input():
    marker = ' '
    print('''
Randomly one of the two player can start by choosing their choice.''')
    while marker != 'X' and marker != 'O':
        marker = input("Enter either 'X' or 'O' > ")

    player1 = marker
    if player1 == 'X':
        player2 = 'O'
    else:
        player2 = 'X'
    return (player1, player2)



def choose_first():
    x=random.randint(1,2)
    if x==1:
        return 'Player1'
    else:
        return 'Player2'


def replay():
    replay=int(input('Do you wish to play again (enter 0 to quit or 1 to play again) '))
    if replay == 1:
        return True
    else:
        return False


def place_marker(board, marker, position):
    board[position] = marker


def win_check(board, mark):
    if (board[1] == board[2] == board[3] == mark) or (board[4] == board[5] == board[6] == mark) or (
            board[7] == board[8] == board[9] == mark) or (board[1] == board[4] == board[7] == mark) or (
            board[2] == board[5] == board[7] == mark) or (board[3] == board[6] == board[9] == mark) or (
            board[1] == board[5] == board[9] == mark) or (board[3] == board[5] == board[7] == mark):
        return True
    else:
        return False


def space_check(board, position):
    if board[position] == ' ':
        return True
    else:
        return False


def full_board_check(board):
    for position in range(1, 10):
        if space_check(board, position):
            return False

    return True



def player_choice(board):
    position = 0

    while position not in [1, 2, 3, 4, 5, 6, 7, 8, 9] or not space_check(board, position):

        position = int(input('Choose your next position: (1-9) '))

    return position


print('''WELCOME TO TIC TAC TOE GAME!!!!!
This is a 3X3 Table game where two players will go on to choose either 'X' and 'O' and start the game by entering it turn by turn in the 9 cells of the table.
The user who gets to first enter their choosen symbol in 3 cells either horizontally or verticaly for diagonally in a row, will win the game.''')

while True:
    test_board = [' '] * 10
    player1_marker, player2_marker = player_input()
    turn = choose_first()
    print(turn + ' will go first')

    play_game = input("Ready to play game( Y or N) > ")
    if play_game.lower()[0] == 'y':
        game_on = True
    else:
        game_on = False



    while game_on:

        if turn == 'Player1':
            display_board(test_board)
            print('Player 1')
            position = player_choice(test_board)

            place_marker(test_board, player1_marker, position)

            if win_check(test_board, player1_marker):
                display_board(test_board)
                print('PLAYER1 HAS WON!!')
                game_on = False

            elif full_board_check(test_board):
                    display_board(test_board)
                    print("It's A TIE")
                    game_on = False
            else:

                    turn = 'Player2'

        elif turn == 'Player2':

            display_board(test_board)
            print('Player 2')
            position = player_choice(test_board)

            place_marker(test_board, player2_marker, position)

            if win_check(test_board, player2_marker):
                display_board(test_board)
                print('PLAYER2 HAS WON!!')
                game_on = False
            else:
                if full_board_check(test_board):
                    display_board(test_board)
                    print("It's A TIE")
                    game_on = False
                else:

                    turn = 'Player1'
    if not replay():
        break





