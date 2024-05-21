"use client";

import { useContext, useEffect, useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

import {
  AuthStateContext,
  ContractContext,
  WalletContext,
} from "../state/auth";
import { useRouter } from "next/navigation";

export default function Admin() {
  const wallet = useContext(WalletContext);
  const contract = useContext(ContractContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const user = useContext(AuthStateContext);
  const [sellers, setSellers] = useState();
  const [sellerName, setSellerName] = useState(null);
  const [sellerWallet, setSellerWallet] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user == null) {
      router.replace("/");
    } else {
      getSellers();
    }
  }, []);

  async function getSellers() {
    let data;
    try {
      data = await contract.methods.getSellers().call({ from: wallet });
    } catch (e) {
      console.log("An error occurred");
      console.log(e);
    }
    let temp = [];
    data.forEach((element) => {
      console.log(element.wallet);
      let dat = { name: element.name, address: String(element.wallet) };
      console.log(dat);
      temp.push(dat);
    });
    setSellers(temp);
  }

  async function addSeller() {
    let code;
    setLoading(true);
    try {
      code = await contract.methods.addSeller(sellerWallet, sellerName).send({
        from: wallet,
      });
    } catch (e) {
      console.log(code);
    }
    console.log(code);
    setLoading(false);
  }

  return (
    <>
      {!user ? (
        <div>Redirecting to sign in...</div>
      ) : (
        <>
          <div className="">
            <div className="flex flex-row w-screen  justify-end">
              <Button
                onClick={onOpen}
                className="mr-5 font-medium mt-2 bg-indigo-700 bg-opacity-40"
              >
                <div className="text-indigo-700">User</div>
              </Button>
            </div>
            <div className="p-5 space-y-5">
              <div className="font-semibold text-indigo-600 text-2xl">
                Register a Seller
              </div>
              <Input
                onChange={(e) => {
                  setSellerWallet(e.target.value);
                }}
                type="email"
                label="Wallet Address"
              ></Input>
              <Input
                onChange={(e) => {
                  setSellerName(e.target.value);
                }}
                type="email"
                label="Seller Name"
              ></Input>
              <Button
                isLoading={loading}
                onClick={addSeller}
                color="primary"
                className="text-md"
              >
                Add Seller
              </Button>
              <div className="text-indigo-600 font-semibold">
                Previously added sellers:
              </div>
              {sellers?.map((element, index) => {
                return (
                  <div key={index} className="bg-neutral-100 p-2 rounded-lg">
                    <div className="text-indigo-600">{element.name}</div>
                    <div className="text-neutral-400 text-sm">
                      {element.address}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Profile Settings
                  </ModalHeader>
                  <ModalBody>
                    <div className="font-medium">Role: {user}</div>
                    <div className="overflow-ellipsis">
                      Wallet Address: {wallet}
                    </div>

                    <Button
                      className="w-min"
                      color="danger"
                      onPress={() => {
                        router.replace("/");
                      }}
                    >
                      Log Out
                    </Button>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
}
