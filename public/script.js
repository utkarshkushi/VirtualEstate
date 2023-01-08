const ABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "plotIndex",
				"type": "uint256"
			}
		],
		"name": "makePayment",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "virtualEstateAccount",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const ADDRESS = "0x526cc91DAE06CAca59C1A797b4b384F10a4568a1";

let icon = document.querySelectorAll('.icon');


let clickEvent = () => {
  index = parseInt(plotIndex().trim());
//   console.log(index);
  if(acknowledgment("confirm payment?")){
    connectMetaMask(index);
}
  else{
    console.log("no ack");
  }
}

icon.forEach((item)=>{
  item.addEventListener('click', clickEvent);
})

let account;
const  connectMetaMask = async (index) =>{
    if(window.ethereum != "undefined"){
        ethereum.request({method: "eth_requestAccounts"}).then(accounts => {
			account = accounts[0];
			console.log("metamask connected " + account);
			connectContract().then(()=>makePayment(0).then(()=>changePurchasedPlotDesign(index)));
		})
}
}

const connectContract = async () =>{
		console.log(ABI +" "+ ADDRESS);
        window.web3 = await new Web3(window.ethereum);
        window.contract = await new window.web3.eth.Contract(ABI, ADDRESS);
        // console.log("contract connected");
}

const makePayment = async (plotIndex) =>{
    await window.contract.methods.makePayment(plotIndex).send({from: account, value: 10000000000000000000});
    // console.log("payment made");
} 

function plotIndex() {
    return prompt("plot index you want to buy [0,1,2,3,4,5,6,7,8]");
  }

function acknowledgment(msg){
	return confirm(msg);
}


function changePurchasedPlotDesign(index) {
	console.log(index);
	let plotElement = icon[index];
	let parentContainer = (plotElement.parentElement).parentElement;
	parentContainer.innerHTML = `<div><button type="button" class="icon" value="0"><i class="fab fa-apple"></i><i class="fa fa-map-pin" aria-hidden="true"></i></button></div>
	<div class ="content">
	   <center>
		   <h3>Details</h3>
		<p>Owned By</p>
		
		<p class="plotStatus">${account}</p>
	   </center>
   </div>`;
	
	
}
