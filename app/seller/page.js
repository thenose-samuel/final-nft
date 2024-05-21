"use client";

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
import { useState, useContext } from "react";
import {
  AuthDispatchContext,
  AuthStateContext,
  WalletContext,
} from "../state/auth";
import UploadComponent from "../component/UploadComponent";
import { useRouter } from "next/navigation";

export default function Seller() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [customerWallet, setCustomerWallet] = useState("");
  const [productID, setProductID] = useState("");
  const [expiry, setExpiry] = useState("");
  const user = useContext(AuthStateContext);
  const wallet = useContext(WalletContext);
  const dispatch = useContext(AuthDispatchContext);
  const router = useRouter();

  return (
    <>
      <div>
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
            Mint Warranty NFT
          </div>
          <Input
            onChange={(e) => {
              setCustomerWallet(e.target.value);
            }}
            type="email"
            label="Customer Wallet Address"
          ></Input>
          <Input
            onChange={(e) => {
              setProductID(e.target.value);
            }}
            type="email"
            label="Product ID"
          ></Input>
          <Input
            onChange={(e) => {
              setExpiry(e.target.value);
            }}
            type="email"
            label="Expiry Date DD-MM-YY"
          ></Input>
          <UploadComponent
            customerWallet={customerWallet}
            expireDate={expiry}
            productId={productID}
          />
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
      </Modal>
    </>
  );
}
