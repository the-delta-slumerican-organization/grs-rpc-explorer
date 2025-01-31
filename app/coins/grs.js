"use strict";

const Decimal = require("decimal.js");
const Decimal8 = Decimal.clone({ precision:8, rounding:8 });

const btcFun = require("./btcFun.js");

const blockRewardEras = [ new Decimal8(50) ];
for (let i = 1; i < 34; i++) {
	let previous = blockRewardEras[i - 1];
	blockRewardEras.push(new Decimal8(previous).dividedBy(2));
}

const currencyUnits = [
	{
		type:"native",
		name:"GRS",
		multiplier:1,
		default:true,
		values:["", "grs", "GRS"],
		decimalPlaces:8
	},
	{
		type:"native",
		name:"mGRS",
		multiplier:1000,
		values:["mgrs"],
		decimalPlaces:5
	},
	{
		type:"native",
		name:"groestls",
		multiplier:1000000,
		values:["groestls"],
		decimalPlaces:2
	},
	{
		type:"native",
		name:"gro",
		multiplier:100000000,
		values:["gro"],
		decimalPlaces:0
	},
	{
		type:"exchanged",
		name:"USD",
		multiplier:"usd",
		values:["usd"],
		decimalPlaces:2,
		symbol:"$"
	},
	{
		type:"exchanged",
		name:"EUR",
		multiplier:"eur",
		values:["eur"],
		decimalPlaces:2,
		symbol:"€"
	},
];

module.exports = {
	name:"Groestlcoin",
	ticker:"GRS",
	logoUrlsByNetwork:{
		"main":"./img/network-mainnet/logo.svg",
		"test":"./img/network-testnet/logo.svg",
		"regtest":"./img/network-regtest/logo.svg",
		"signet":"./img/network-signet/logo.svg"
	},
	coinIconUrlsByNetwork:{
		"main":"./img/network-mainnet/coin-icon.svg",
		"test":"./img/network-testnet/coin-icon.svg",
		"signet":"./img/network-signet/coin-icon.svg",
		"regtest":"./img/network-regtest/coin-icon.svg"
	},
	coinColorsByNetwork: {
		"main": "#00a4bd",
		"test": "#000000",
		"signet": "#ff5b42",
		"regtest": "#777"
	},
	siteTitlesByNetwork: {
		"main":"Groestlcoin Explorer",
		"test":"Testnet Explorer",
		"regtest":"Regtest Explorer",
		"signet":"Signet Explorer",
	},
	demoSiteUrlsByNetwork: {
		"main": "https://rpcexplorer.groestlcoin.org",
		"test": "https://rpcexplorer-test.groestlcoin.org",
		"signet": "https://rpcexplorer-signet.groestlcoin.org",
	},
	knownTransactionsByNetwork: {
		main: "c4d5b7cea3aed136e6e2beabcb4cdc21aa2d32b75a94eb74313154dac0615235",
		test: "73f1a0a89f65311230290d63f9635d165096d4451cc7da7cdb6e1ac2bfc103f7",
		signet: "fc0cdf6a0a1da19084a09bbb6f9d160a4265e3c64cd1b73e88be3902f81dc033"
	},
	miningPoolsConfigUrls:[
		"https://raw.githubusercontent.com/btc21/Bitcoin-Known-Miners/master/miners.json",
		"https://raw.githubusercontent.com/0xB10C/known-mining-pools/master/pools.json",
		"https://raw.githubusercontent.com/btccom/Blockchain-Known-Pools/master/pools.json",
		"https://raw.githubusercontent.com/blockchain/Blockchain-Known-Pools/master/pools.json"
	],
	maxBlockWeight: 4000000,
	maxBlockSize: 1000000,
	minTxBytes: 166, // ref: https://en.bitcoin.it/wiki/Maximum_transaction_rate
	minTxWeight: 166 * 4, // hack
	difficultyAdjustmentBlockCount: 1,
	maxSupplyByNetwork: {
		"main": new Decimal(105000000),
		"test": new Decimal(105000000),
		"regtest": new Decimal(105000000),
		"signet": new Decimal(105000000)
	},
	targetBlockTimeSeconds: 60,
	targetBlockTimeMinutes: 1,
	currencyUnits:currencyUnits,
	currencyUnitsByName:{"GRS":currencyUnits[0], "mGRS":currencyUnits[1], "groestls":currencyUnits[2], "gro":currencyUnits[3]},
	baseCurrencyUnit:currencyUnits[3],
	defaultCurrencyUnit:currencyUnits[0],
	feeSatoshiPerByteBucketMaxima: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 50, 75, 100, 150],

	halvingBlockIntervalsByNetwork: {
		"main": 210000,
		"test": 210000,
		"regtest": 150,
		"signet": 210000
	},

	// used for supply estimates that don't need full gettxoutset accuracy
	coinSupplyCheckpointsByNetwork: {
		"main": [ 3763899, new Decimal(78427388) ],
		"test": [ 2284501, new Decimal(71030393) ],
		"signet": [ 494013, new Decimal(55585929) ],
		"regtest": [ 0, new Decimal(0) ]
	},

	utxoSetCheckpointsByNetwork: {
		"main": {"height":3782345,"bestblock":"0000000000000b7b4f4b75d37acba3c8c14f22a2b0a09f22768465e4504ccf36","transactions":157784,"txouts":430352,"bogosize":32298706,"hash_serialized_2":"2345036cc703d329c0dee6917879d72e543c6e59eb1c8bc4d181ef3a82d0479e","disk_size":23763902,"total_amount":"78519613.88738880","lastUpdated":1633291116000}
	},

	genesisBlockHashesByNetwork:{
		"main":    "00000ac5927c594d49cc0bdb81759d0da8297eb614683d3acb62f0703b639023",
		"test":    "000000ffbb50fc9898cdd36ec163e6ba23230164c0052a28876255b7dcf2cd36",
		"regtest": "000000ffbb50fc9898cdd36ec163e6ba23230164c0052a28876255b7dcf2cd36",
		"signet":  "0000007fcaa2a27993c6cde9e7818c254357af517b876ceba2f23592bb14ab31"
	},
	genesisCoinbaseTransactionIdsByNetwork: {
		"main":    "3ce968df58f9c8a752306c4b7264afab93149dbc578bd08a42c446caaa6628bb",
		"test":    "3ce968df58f9c8a752306c4b7264afab93149dbc578bd08a42c446caaa6628bb",
		"regtest": "3ce968df58f9c8a752306c4b7264afab93149dbc578bd08a42c446caaa6628bb",
		"signet":  "3ce968df58f9c8a752306c4b7264afab93149dbc578bd08a42c446caaa6628bb"
	},
	genesisCoinbaseTransactionsByNetwork:{
		"main": {
			"hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff3a04ffff001d0104325072657373757265206d75737420626520707574206f6e20566c6164696d697220507574696e206f766572204372696d6561ffffffff010000000000000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000",
			"txid": "3ce968df58f9c8a752306c4b7264afab93149dbc578bd08a42c446caaa6628bb",
			"hash": "3ce968df58f9c8a752306c4b7264afab93149dbc578bd08a42c446caaa6628bb",
			"size": 185,
			"vsize": 185,
			"version": 1,
			"confirmations":3318814,
			"vin": [
				{
					"coinbase": "04ffff001d0104325072657373757265206d75737420626520707574206f6e20566c6164696d697220507574696e206f766572204372696d6561",
					"sequence": 4294967295
				}
			],
			"vout": [
				{
					"value": 0,
					"n": 0,
					"scriptPubKey": {
						"asm": "04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f OP_CHECKSIG",
						"hex": "4104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac",
						"reqSigs": 1,
						"type": "pubkey"
					}
				}
			],
			"blockhash": "00000ac5927c594d49cc0bdb81759d0da8297eb614683d3acb62f0703b639023",
			"time": 1395342829,
			"blocktime": 1395342829
		},
		"test": {
			"hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff3a04ffff001d0104325072657373757265206d75737420626520707574206f6e20566c6164696d697220507574696e206f766572204372696d6561ffffffff010000000000000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000",
			"txid": "3ce968df58f9c8a752306c4b7264afab93149dbc578bd08a42c446caaa6628bb",
			"hash": "3ce968df58f9c8a752306c4b7264afab93149dbc578bd08a42c446caaa6628bb",
			"version": 1,
			"size": 266,
			"vsize": 266,
			"weight": 740,
			"locktime": 0,
			"vin": [
				{
					"coinbase": "04ffff001d0104325072657373757265206d75737420626520707574206f6e20566c6164696d697220507574696e206f766572204372696d6561",
					"sequence": 4294967295
				}
			],
			"vout": [
				{
					"value": 0,
					"n": 0,
					"scriptPubKey": {
						"asm": "04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f OP_CHECKSIG",
						"hex": "4104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac",
						"reqSigs": 1,
						"type": "pubkey"
					}
				}
			],
			"blockhash": "000000ffbb50fc9898cdd36ec163e6ba23230164c0052a28876255b7dcf2cd36",
			"time": 1440000002,
			"blocktime": 1440000002
		},
		"regtest": {
			"hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff3a04ffff001d0104325072657373757265206d75737420626520707574206f6e20566c6164696d697220507574696e206f766572204372696d6561ffffffff010000000000000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000",
			"txid": "3ce968df58f9c8a752306c4b7264afab93149dbc578bd08a42c446caaa6628bb",
			"hash": "3ce968df58f9c8a752306c4b7264afab93149dbc578bd08a42c446caaa6628bb",
			"version": 1,
			"size": 266,
			"vsize": 266,
			"weight": 740,
			"locktime": 0,
			"vin": [
				{
					"coinbase": "04ffff001d0104325072657373757265206d75737420626520707574206f6e20566c6164696d697220507574696e206f766572204372696d6561",
					"sequence": 4294967295
				}
			],
			"vout": [
				{
					"value": 0,
					"n": 0,
					"scriptPubKey": {
						"asm": "04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f OP_CHECKSIG",
						"hex": "4104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac",
						"type": "pubkey"
					}
				}
			],
			"blockhash": "000000ffbb50fc9898cdd36ec163e6ba23230164c0052a28876255b7dcf2cd36",
			"time": 1395342829,
			"blocktime": 1395342829
		},
		"signet": {
			"hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff3a04ffff001d0104325072657373757265206d75737420626520707574206f6e20566c6164696d697220507574696e206f766572204372696d6561ffffffff010000000000000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000",
			"txid": "3ce968df58f9c8a752306c4b7264afab93149dbc578bd08a42c446caaa6628bb",
			"hash": "3ce968df58f9c8a752306c4b7264afab93149dbc578bd08a42c446caaa6628bb",
			"version": 3,
			"size": 266,
			"vsize": 266,
			"weight": 1064,
			"locktime": 0,
			"vin": [
				{
					"coinbase": "04ffff001d0104325072657373757265206d75737420626520707574206f6e20566c6164696d697220507574696e206f766572204372696d6561",
					"sequence": 4294967295
				}
			],
			"vout": [
				{
					"value": 0,
					"n": 0,
					"scriptPubKey": {
						"asm": "04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f OP_CHECKSIG",
						"hex": "4104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac",
						"type": "pubkey"
					}
				}
			],
			"blockhash": "0000007fcaa2a27993c6cde9e7818c254357af517b876ceba2f23592bb14ab31",
			"time": 1606082400,
			"blocktime": 1606082400
		}
	},
	genesisBlockStatsByNetwork:{
		"main": {
			"avgfee": 0,
			"avgfeerate": 0,
			"avgtxsize": 0,
			"blockhash": "00000ac5927c594d49cc0bdb81759d0da8297eb614683d3acb62f0703b639023",
			"feerate_percentiles": [
				0,
				0,
				0,
				0,
				0
			],
			"height": 0,
			"ins": 0,
			"maxfee": 0,
			"maxfeerate": 0,
			"maxtxsize": 0,
			"medianfee": 0,
			"mediantime": 1395342829,
			"mediantxsize": 0,
			"minfee": 0,
			"minfeerate": 0,
			"mintxsize": 0,
			"outs": 1,
			"subsidy": 0,
			"swtotal_size": 0,
			"swtotal_weight": 0,
			"swtxs": 0,
			"time": 1395342829,
			"total_out": 0,
			"total_size": 0,
			"total_weight": 0,
			"totalfee": 0,
			"txs": 1,
			"utxo_increase": 1,
			"utxo_size_inc": 117
		},
		"test": {
			"avgfee": 0,
			"avgfeerate": 0,
			"avgtxsize": 0,
			"blockhash": "000000ffbb50fc9898cdd36ec163e6ba23230164c0052a28876255b7dcf2cd36",
			"feerate_percentiles": [
				0,
				0,
				0,
				0,
				0
			],
			"height": 0,
			"ins": 0,
			"maxfee": 0,
			"maxfeerate": 0,
			"maxtxsize": 0,
			"medianfee": 0,
			"mediantime": 1440000002,
			"mediantxsize": 0,
			"minfee": 0,
			"minfeerate": 0,
			"mintxsize": 0,
			"outs": 1,
			"subsidy": 0,
			"swtotal_size": 0,
			"swtotal_weight": 0,
			"swtxs": 0,
			"time": 1440000002,
			"total_out": 0,
			"total_size": 0,
			"total_weight": 0,
			"totalfee": 0,
			"txs": 1,
			"utxo_increase": 1,
			"utxo_size_inc": 117
		},
		"regtest": {
			"avgfee": 0,
			"avgfeerate": 0,
			"avgtxsize": 0,
			"blockhash": "000000ffbb50fc9898cdd36ec163e6ba23230164c0052a28876255b7dcf2cd36",
			"feerate_percentiles": [
				0,
				0,
				0,
				0,
				0
			],
			"height": 0,
			"ins": 0,
			"maxfee": 0,
			"maxfeerate": 0,
			"maxtxsize": 0,
			"medianfee": 0,
			"mediantime": 1296688602,
			"mediantxsize": 0,
			"minfee": 0,
			"minfeerate": 0,
			"mintxsize": 0,
			"outs": 1,
			"subsidy": 5000000000,
			"swtotal_size": 0,
			"swtotal_weight": 0,
			"swtxs": 0,
			"time": 1296688602,
			"total_out": 0,
			"total_size": 0,
			"total_weight": 0,
			"totalfee": 0,
			"txs": 1,
			"utxo_increase": 1,
			"utxo_size_inc": 117
		},
		"signet": {
			"avgfee": 0,
			"avgfeerate": 0,
			"avgtxsize": 0,
			"blockhash": "0000007fcaa2a27993c6cde9e7818c254357af517b876ceba2f23592bb14ab31",
			"feerate_percentiles": [
				0,
				0,
				0,
				0,
				0
			],
			"height": 0,
			"ins": 0,
			"maxfee": 0,
			"maxfeerate": 0,
			"maxtxsize": 0,
			"medianfee": 0,
			"mediantime": 1606082400,
			"mediantxsize": 0,
			"minfee": 0,
			"minfeerate": 0,
			"mintxsize": 0,
			"outs": 1,
			"subsidy": 0,
			"swtotal_size": 0,
			"swtotal_weight": 0,
			"swtxs": 0,
			"time": 1606082400,
			"total_out": 0,
			"total_size": 0,
			"total_weight": 0,
			"totalfee": 0,
			"txs": 1,
			"utxo_increase": 1,
			"utxo_size_inc": 117
		}
	},
	testData: {
		txDisplayTestList: {
			"0dcbd6281bda566912947373a6894708cafddb6641e5727a2a247b0c0575fa7f" : {
				blockHeight: 3700000, blockHash: "00000000000020b8adc9046cea2a85955d330e77e310cbb46986b67329cd2339"
			},
			"fca74998764f3fc8cf3a12989d95c65c280e2a594b5c0722f36d4d89098f8728" : {
				blockHeight: 3000000, blockHash: "0000000000000a409d1ded3df352b4c975e797da43d6024faea7b8794b94fe8f"
			}
		}
	},
	genesisCoinbaseOutputAddressScripthash:"8b01df4e368ea28f8dc0423bcf7a4923e3a12d307c875e47a0cfbf90b5c39161",
	historicalData: btcFun.items,
	exchangeRateData:{
		jsonUrl:"https://api.coingecko.com/api/v3/simple/price?ids=groestlcoin&vs_currencies=usd,eur,gbp",
		responseBodySelectorFunction:function(responseBody) {
			//console.log("Exchange Rate Response: " + JSON.stringify(responseBody));

			var exchangedCurrencies = ["usd", "gbp", "eur"];

			if (responseBody.groestlcoin) {
				var exchangeRates = {};

				for (var i = 0; i < exchangedCurrencies.length; i++) {
					if (responseBody.groestlcoin[exchangedCurrencies[i]]) {
						exchangeRates[exchangedCurrencies[i].toLowerCase()] = responseBody.groestlcoin[exchangedCurrencies[i]];
					}
				}

				return exchangeRates;
			}

			return null;
		}
	},
	goldExchangeRateData:{
		jsonUrl:"https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument/XAU/USD",
		responseBodySelectorFunction:function(responseBody) {
			//console.log("Exchange Rate Response: " + JSON.stringify(responseBody));

			if (responseBody[0].topo && responseBody[0].topo.platform == "MT5") {
				var prices = responseBody[0].spreadProfilePrices[0];

				return {
					usd: prices.ask
				};
			}

			return null;
		}
	},
	blockRewardFunction:function(blockHeight) {
		// https://github.com/Groestlcoin/groestlcoin/blob/master/src/groestlcoin.cpp#L59
		var premine = new Decimal8(240640);
		var genesisBlockReward = new Decimal8(0);
		var minimumSubsidy = new Decimal8(5);
		function GetBlockSubsidy() {
			var nSubsidy = new Decimal8(512);
			// Subsidy is reduced by 6% every 10080 blocks, which will occur approximately every 1 week
			var exponent = Math.floor((blockHeight / 10080));
			for (var i = 0; i < exponent; i++){
					nSubsidy = nSubsidy.times(47).dividedBy(50);
			}
			if (nSubsidy.lte(minimumSubsidy)) {
				nSubsidy = minimumSubsidy;
			}
			return nSubsidy;
		}

		function GetBlockSubsidy120000() {
			var nSubsidy = new Decimal8(250);
			// Subsidy is reduced by 10% every day (1440 blocks)
			var exponent = Math.floor(((blockHeight - 120000) / 1440));
			for (var i = 0; i < exponent; i++){
					nSubsidy = nSubsidy.times(45).dividedBy(50);
			}
			if (nSubsidy.lte(minimumSubsidy)) {
				nSubsidy = minimumSubsidy;
			}
			return nSubsidy;
		}

		function GetBlockSubsidy150000() {
			var nSubsidy = new Decimal8(25);
			// Subsidy is reduced by 1% every week (10080 blocks)
			var exponent = Math.floor(((blockHeight - 150000) / 10080));
			for (var i = 0; i < exponent; i++){
					nSubsidy = nSubsidy.times(99).dividedBy(100);
			}
			if (nSubsidy.lte(minimumSubsidy)) {
				nSubsidy = minimumSubsidy;
			}
			return nSubsidy;
		}

		if (blockHeight == 0) {
			return genesisBlockReward;
		}
		if (blockHeight == 1) {
			return premine;
		}
		if (blockHeight >= 150000) {
			return GetBlockSubsidy150000();
		}
		if (blockHeight >= 120000) {
			return GetBlockSubsidy120000();
		}
		return GetBlockSubsidy();
	}
};
