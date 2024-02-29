$(document).ready(function () {
    var sudokuBoard = '';
    var size = 9;

    for (var i = 0; i < size; i++) {
        sudokuBoard += '<div class="row">';
        for (var j = 0; j < size; j++) {
            sudokuBoard += '<input name="cell' + j + '" id="cell' + j + '" class="cell" type="text" maxlength="1" size="1">';
        }
        sudokuBoard += '</div>';
    }

    $('#sudokuBoard').html(sudokuBoard);

    $('#solveBtn').click(function () {
        var board = [];
        var rows = $('.row');

        rows.each(function () {
            var row = [];
            $(this).find('.cell').each(function () {
                var value = $(this).val();
                row.push(value !== '' ? parseInt(value) : 0);
            });
            board.push(row);
        });

        solveSudoku(board);

        rows.each(function (rowIndex) {
            $(this).find('.cell').each(function (cellIndex) {
                $(this).val(board[rowIndex][cellIndex]);
            });
        });
    });

    function solveSudoku(board) {
        function findEmptyCell() {
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    if (board[row][col] === 0) {
                        return [row, col];
                    }
                }
            }
            return null;
        }

        function isValid(row, col, num) {
            // Check row
            for (let i = 0; i < 9; i++) {
                if (board[row][i] === num) {
                    return false;
                }
            }

            // Check column
            for (let i = 0; i < 9; i++) {
                if (board[i][col] === num) {
                    return false;
                }
            }

            // Check subgrid
            const startRow = Math.floor(row / 3) * 3;
            const startCol = Math.floor(col / 3) * 3;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[startRow + i][startCol + j] === num) {
                        return false;
                    }
                }
            }

            return true;
        }

        const emptyCell = findEmptyCell();
        if (!emptyCell) {
            return true; // Puzzle solved
        }

        const [row, col] = emptyCell;

        for (let num = 1; num <= 9; num++) {
            if (isValid(row, col, num)) {
                board[row][col] = num;

                if (solveSudoku(board)) {
                    return true;
                }

                board[row][col] = 0; // Backtrack
            }
        }

        return false; // No solution found
    }

    $('#reset').click(function () {
        var rows = $('.row');
        rows.each(function () {
            $(this).find(".cell").each(function () {
                $(this).val("");
            })
        })
    })

    $('#solveBtn').click(function () {
        confetti({
            particleCount: 200,
            startVelocity: 40,
            spread: 1000,
            origin: { y: .8 },
            angle: 45,
            scalar: 0.7,
            gravity: .5,
            shapes: ['circle']
        });
    })  


});
