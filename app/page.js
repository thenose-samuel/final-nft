"use client";

import Web3 from "web3";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  NextUIProvider,
} from "@nextui-org/react";
import { useContext, useState, useEffect } from "react";
import { AuthDispatchContext, AuthStateContext } from "./state/auth";

import { useRouter } from "next/navigation";

import contractABI from "./utils/abi.json";
import { CONTRACT_ADDRESS } from "./utils/constants";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [contract, setContract] = useState(null);
  const dispatch = useContext(AuthDispatchContext);
  const user = useContext(AuthStateContext);
  const router = useRouter();

  async function connectWallet() {
    const accounts = await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .catch((error) => {
        throw "Failed to connect. Try again.";
      });
    const wallet = accounts[0];
    let data = await contract.methods.getUserType().call({ from: wallet });
    dispatch({ wallet: accounts[0], user: data, contract: contract });
  }

  useEffect(() => {
    if (user == "admin") {
      router.replace("/admin");
    } else if (user === "seller") {
      router.replace("/seller");
    } else if (user === "customer") {
      router.replace("/customer");
    } else {
      let web3 = new Web3(window.ethereum);
      let contract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS);
      setContract(contract);
    }
  }, [loading]);

  return (
    <NextUIProvider>
      <div className="bg-neutral-400 h-[100vh] w-[100%] flex flex-col justify-center items-center">
        <Card className="w-[80vw]">
          <CardHeader className="font-bold text-indigo-600">
            {"NFT Warranty System"}
          </CardHeader>
          <CardBody>
            <Button
              isLoading={loading}
              onClick={async () => {
                setError(null);
                setLoading(true);
                try {
                  await connectWallet();
                } catch (e) {
                  console.log(e);
                  setError(e);
                }
                setLoading(false);
              }}
              color={!error ? "primary" : "danger"}
            >
              {!error ? "Metamask Login" : error}
            </Button>
          </CardBody>
        </Card>
      </div>
    </NextUIProvider>
  );
}
