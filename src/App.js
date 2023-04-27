import { useEffect, useState } from "react";
import { ethers } from "ethers";

// Components
import Navigation from "./components/Navigation";
import Button from "./components/Button";
import Section from "./components/Section";
import Product from "./components/Product";
import BackgroundImage from "../src/assets/Shopping Management System.jpg";

// ABIs
import Dappazon from "./abis/Dappazon.json";

// Config
import config from "./config.json";
import { WebSocketProvider } from "@ethersproject/providers";

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [dappazon, setDappazon] = useState(null);
  const [electronics, setElectronics] = useState(null);
  const [clothing, setClothing] = useState(null);
  const [toys, setToys] = useState(null);
  const [item, setItem] = useState({});
  const [toggle, setToggle] = useState(false);

  const togglePop = (item) => {
    setItem(item);
    toggle ? setToggle(false) : setToggle(true);
  };

  const loadBlockchainData = async () => {
    // Connect to the Blockchain
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    const network = await provider.getNetwork();
    console.log(network);

    // Connect to SC(create JS versions)
    const dappazon = new ethers.Contract(
      config[network.chainId].dappazon.address,
      Dappazon,
      provider
    );
    setDappazon(dappazon);

    // Load items
    const items = [];
    for (let i = 1; i <= 9; i++) {
      const item = await dappazon.items(i);
      items.push(item);
    }

    const electronics = items.filter((item) => item.category === "electronics");
    const clothing = items.filter((item) => item.category === "clothing");
    const toys = items.filter((item) => item.category === "toys");
    setElectronics(electronics);
    setClothing(clothing);
    setToys(toys);
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div>
      {/* <Navigation account={account} setAccount={setAccount} /> */}
      <div id="root2">
        <img src={BackgroundImage} alt="Background Image" />
      </div>
      <Button account={account} setAccount={setAccount} />
      {electronics && (
        <>
          <Section items={electronics} togglePop={togglePop} />
        </>
      )}
      {toggle && (
        <Product
          item={item}
          provider={provider}
          account={account}
          dappazon={dappazon}
          togglePop={togglePop}
        />
      )}
    </div>
  );
}

export default App;