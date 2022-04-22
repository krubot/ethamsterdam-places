// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0;

contract Places {
    enum Colour{
        White,       // #ffffff
        LightGray,   // #e4e4e4
        DarkGray,    // #888888
        Black,       // #222222
        Pink,        // #ffa7d1
        Red,         // #e50000
        Orange,      // #e59500
        Brown,       // #a06a42
        Yellow,      // #e5d900
        LightGreen,  // #94e044
        DarkGreen,   // #02be01
        LightBlue,   // #00d3dd
        Blue,        // #0083c7
        DarkBlue,    // #0000ea
        LightPurple, // #cf6ee4
        DarkPurple   // #820080
    }

    Colour[16][16] state;

    constructor() public {
        for (uint i=0; i<16; i++){
            for (uint j=0; j<16; j++){
                state[i][j] = Colour.White;
            }
        }
    }

    function store(Colour _colour, uint i, uint j) public {
        state[i][j] = _colour;
    }

    function retrieve(uint i, uint j) public view returns (Colour){
        return state[i][j];
    }
}
