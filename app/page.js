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
  const [error, setError] = useState("Metamask Login");
  const [contract, setContract] = useState(null);
  const dispatch = useContext(AuthDispatchContext);
  const user = useContext(AuthStateContext);
  const router = useRouter();

  async function connectWallet() {
    try {
      const accounts = await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .catch((error) => {
          throw "Failed to connect. Try again.";
        });
      const wallet = accounts[0];
      let data = await contract.methods.getUserType().call({ from: wallet });
      dispatch({ wallet: accounts[0], user: data, contract: contract });
    } catch (e) {
      setError("Metamask Not Found");
    }
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
      <div
        style={{ backgroundColor: "#101014" }}
        className="w-[100%] flex flex-col "
      >
        <div
          style={{ color: "#f2efce" }}
          className="mt-10 pl-6 mb-20 font-bold text-md"
        >
          NFT WARRANTY
        </div>
        <div
          id="top-section"
          className="w-screen pl-6 pr-14 bg-gradient-to-b gradient  flex flex-col justify-between"
        >
          <div
            style={{ color: "#f2efce" }}
            className=" mb-5 font-bold text-4xl"
          >
            A new age warranty system based on the blockchain
          </div>
        </div>
        <div>
          <div
            style={{ color: "#f2efce" }}
            className=" text-lg  bg-gradient-to-b gradient from-blue-900 to-blue-600 from-30% p-4 m-6 mb-1 rounded-md"
          >
            <div className="font-bold text-3xl">Secure</div>
            <div className="text-sm mt-5">
              Blockchain is a distributed ledger that records transations and
              data in a transparent and immutable way.
            </div>
            <div className="text-sm font-normal mt-5">LEARN MORE</div>
          </div>
        </div>
        <div>
          <div
            style={{ color: "#f2efce" }}
            className=" text-lg  bg-gradient-to-b gradient from-teal-900 to-teal-600 from-30% p-4 m-6 mb-1 rounded-md"
          >
            <div className="font-bold text-3xl">Paperless</div>
            <div className="text-sm mt-5">
              It eliminates the need for physical paper documents that can get
              lost, damaged or misplaced.
            </div>
            <div className="text-sm font-normal mt-5">LEARN MORE</div>
          </div>
        </div>
        <div>
          <div
            style={{ color: "#f2efce" }}
            className=" text-lg  bg-gradient-to-b gradient from-pink-900 to-pink-600 from-30% p-4 m-6 rounded-md"
          >
            <div className="font-bold text-3xl">Zero Forgery</div>
            <div className="text-sm mt-5">
              NFTs minted by the application can be verified it was actually
              issued in the past by an authorised seller
            </div>
            <div className="text-sm font-normal mt-5">LEARN MORE</div>
          </div>
        </div>
        {/* <Card className="w-[80vw]">
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
        </Card> */}
        <div
          onClick={async () => {
            setLoading(true);
            setError("Please wait...");
            try {
              await connectWallet();
            } catch (e) {
              console.log(e);
              setError(e);
            }
            setLoading(false);
          }}
          className="font-semibold text-center m-6  mt-1 pr-3 pl-3 cursor-pointer pt-2 pb-2 rounded-md text-md text-white bg-cyan-900"
        >
          {error}
        </div>
      </div>
    </NextUIProvider>
  );
}
