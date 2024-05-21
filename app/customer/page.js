"use client";

import { useContext, useEffect, useState } from "react";
import {
  AuthDispatchContext,
  AuthStateContext,
  ContractContext,
  WalletContext,
} from "../state/auth";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Divider,
} from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Iron from "../../public/iron.png";
import RTX from "../../public/rtx.png";
import Razer from "../../public/razer.png";

export default function Customer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // const { isOpenInfo, onOpenInfo, onOpenChangeInfo } = useDisclosure();
  const user = useContext(AuthStateContext);
  const contract = useContext(ContractContext);
  const wallet = useContext(WalletContext);
  const dispatch = useContext(AuthDispatchContext);
  const [loading, setLoading] = useState(false);
  const [warrantyInfo, setWarrantyInfo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // async function getInfo() {
    //   setLoading(true);
    //   let data = null;
    //   data = await getUserNFT();
    //   console.log(data);
    //   console.log(["a", "b", "c"]);
    //   setWarrantyInfo({ item: data });
    //   setLoading(false);
    // }
    // getInfo();
    getUserNFT();
  }, []);

  async function getMetadata(warranties) {
    let warrantyData = [];
    warranties.forEach(async (tokenId) => {
      let tokenURI = await contract.methods
        .getTokenURI(wallet, tokenId)
        .call({ from: wallet });
      let warrantyCard = await fetch(tokenURI, { mode: "no-cors" });
      let info = await warrantyCard.json();
      console.log(info);
      warrantyData.push(info);
    });
    return warrantyData;
  }

  async function getUserNFT() {
    setLoading(true);
    let data = await contract.methods
      .getAllTokens(wallet)
      .call({ from: wallet });
    let warranties = data;
    let warrantyData = await getMetadata(warranties);
    console.log(warrantyData);
    setWarrantyInfo(warrantyData);
    setLoading(false);
  }

  return (
    <>
      <div>
        <div className="flex flex-row w-screen  justify-end">
          <Button
            onClick={onOpen}
            className="mr-5 font-medium mt-2 bg-indigo-700 bg-opacity-40"
          >
            <div className="text-indigo-700">Profile Settings</div>
          </Button>
        </div>
        <div className="p-5 space-y-5">
          <div className="font-semibold text-indigo-600 text-2xl">
            Valid Warranties
          </div>
        </div>
        {/* {!loading ? (
          <div className="p-5">
            {" "}
            {warrantyInfo.map((element, index) => {
              return (
                <div key={index}>
                  <Card className="w-min">
                    <div>{element.name}</div>
                    <img src={element.image}></img>
                  </Card>
                </div>
              );
            })}
          </div>
        ) : (
          <div>Loading please wait</div>
        )}
         */}
        <div className="p-5">
          <Card isFooterBlurred radius="lg" className="border-none">
            <Image
              alt="iron"
              className="object-cover"
              height={200}
              src={Iron}
              width={400}
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-medium text-white/80">Phillips Iron</p>
              <Button
                className="text-tiny text-white bg-black/20"
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
          <Card isFooterBlurred radius="lg" className="border-none mt-5">
            <Image
              alt="iron"
              className="object-cover"
              height={400}
              src={RTX}
              width={400}
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-medium text-white/80">
                RTX 4090 Founder&apos;s Edition
              </p>
              <Button
                className="text-tiny text-white bg-black/20"
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
                onClick={onOpen}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
          <Card isFooterBlurred radius="lg" className="border-none mt-5">
            <Image
              alt="iron"
              className="object-cover"
              height={400}
              src={Razer}
              width={400}
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-medium text-white/80">Razer Headphones</p>
              <Button
                className="text-tiny text-white bg-black/20"
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      {/* <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
                    dispatch({
                      wallet: null,
                      user: null,
                      contract: null,
                    });

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
      </Modal> */}
      {/* <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Product Details
              </ModalHeader>
              <ModalBody>
               
                <div className="overflow-ellipsis">Name: Phillips Iron</div>
                <div className="overflow-ellipsis">ID: A232-1321</div>
                <div className="overflow-ellipsis">
                  Warranty Left:{" "}
                  <span className="text-green-700 font-semibold">365 days</span>
                </div>
                <div className="flex space-x-5">
                  <Button
                    className="w-min"
                    color="primary"
                    onPress={() => {
                      dispatch({
                        wallet: null,
                        user: null,
                        contract: null,
                      });

                      router.replace("/");
                    }}
                  >
                    Redeem
                  </Button>

                  <Button
                    className="w-min"
                    color="danger"
                    onPress={() => {
                      dispatch({
                        wallet: null,
                        user: null,
                        contract: null,
                      });

                      router.replace("/");
                    }}
                  >
                    Transfer
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal> */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Transfer Warranty
              </ModalHeader>
              <ModalBody>
                <div className="overflow-ellipsis">
                  Transfer of{" "}
                  <span className="font-bold text-red-500">Phillips Iron</span>
                </div>
                <div className="overflow-ellipsis">ID: A232-1321</div>
                <Input
                  key={"primary"}
                  type="Recipient's Address"
                  color="primary"
                  label="Recipient's Address"
                  placeholder="Enter wallet address"
                  // defaultValue="junior@nextui.org"
                  className=""
                />
                <div className="flex space-x-5">
                  {/* <Button
                    className="w-min"
                    color="primary"
                    onPress={() => {
                      dispatch({
                        wallet: null,
                        user: null,
                        contract: null,
                      });

                      router.replace("/");
                    }}
                  >
                    Redeem
                  </Button> */}

                  <Button
                    className="w-min"
                    color="danger"
                    onPress={() => {
                      dispatch({
                        wallet: null,
                        user: null,
                        contract: null,
                      });

                      router.replace("/");
                    }}
                  >
                    Transfer
                  </Button>
                </div>
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
  );
}
