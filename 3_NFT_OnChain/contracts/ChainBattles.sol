// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";

// import "hardhat/console.sol";

contract ChainBattles is ERC721URIStorage{
    using Strings for uint256;
    using Counters for Counters.Couneter;
    Counters.Counter private _tokenIds;

    error ChainBattles_OnlyOwnerCanTrainIt();
    error ChainBattles_PleaseUseAnExistingToken();

    string constant IMG = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"> <rect width="200" height="200" fill="white"/><circle cx="100" cy="100" r="50" fill="blue"/><text>getAge(tokenId)</text></svg>';

    mapping(uint256 tokenId => uint256 levels) public tokenIdToLevels;

    constructor() ERC721("Chain Battles", "CBT")
    {

    }

    function generateCharacterIMG(uint256) public returns (string memory){
       bytes memory svg = abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">',
                '<rect width="200" height="200" fill="white"/>',
                '<circle cx="100" cy="100" r="50" fill="blue"/>',
                '<text x="10" y="30" font-size="16" fill="black">Warrior</text>',
                // '<text x="10" y="50" font-size="16" fill="black">Levels: ', Strings.toString(getLevels(tokenId)), '</text>',
                '<text x="10" y="50" font-size="16" fill="black">Levels: ', getLevels(tokenId), '</text>',
            '</svg>'
        );
        string memory imgEncodedInBase64 = string(
            abi.encodePacked(
                "data:image/svg+xml;base64,",
                Base64.encode(svg)
            )
        );
        return imgEncodedInBase64;
    }

    function getLevels(uint256 tokenId) public view returns(string memory){
        uint256 nftLevel = tokenIdToLevels[tokenId];
        return nftLevel.toString(); //xq uint using Strings)
    }

    function getTokenURI(uint256 tokenId) public returns (string memory){
        bytes memory dataURI = abi.encodePacked(
            "{",
                '"name": "Chain Battles #', Strings.toString(tokenId), '",',
                '"description": "Battles On Chain",',
                '"image": "', generateCharacterIMG(tokenId), '"',
            "}"
        );
        string memory metadataURI = string(
            abi.encodePacked(
                "data:application/json;base64,", //json - base64Encoded
                Base64.encode(dataURI)
            )
        );
        return metadataURI;
    }

    function mint() public {
        _tokenIds.Increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        
        tokenIdToLevels[newItemId] = 0;
        _setTokenURI(newItemId, getTokenURI(newItemId));
    }

    function train(uint256 tokenId) public {
        if(!_exists(tokenId)){
            revert ChainBattles_PleaseUseAnExistingToken();
        }
        if(ownerOf(tokenId) != msg.sender){
            revert ChainBattles_OnlyOwnerCanTrainIt();
            
        }
        tokenIdToLevels[tokenId]++;
        _setTokenURI(tokenId, getTokenURI(tokenId));
    }


}