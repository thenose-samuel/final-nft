import { useContext, useRef, useState } from "react";
import UploadIcon from "./UploadIcon";

import { ContractContext, WalletContext } from "../state/auth";
import { Button } from "@nextui-org/react";

export default function UploadComponent({
  productId,
  customerWallet,
  expireDate,
}) {
  const [base64, setBase64] = useState("");
  const [loading, setLoading] = useState(false);
  const connectedWallet = useContext(WalletContext);
  const contract = useContext(ContractContext);

  const urlPromoRef = useRef();

  async function mintNFT(customerWallet, tokenURI) {
    await contract.methods
      .mintNFT(customerWallet, tokenURI)
      .send({ from: connectedWallet });
  }

  async function uploadMetadata(productId, customerWallet, expireDate, image) {
    try {
      const form = new FormData();
      form.append("file", dataURItoBlob(image));
      let options = {
        method: "POST",
        body: form,
        headers: {
          Authorization: "80205640-3cfb-4268-b494-f515f791964b",
        },
      };
      let response = await fetch("https://api.nftport.xyz/v0/files", options);
      let data = await response.json();
      const imgURI = data.ipfs_url;
      let metadata = {
        name: "Warranty NFT",
        description: "Minted for a product sold to a customer",
        file_url: imgURI,
        custom_fields: {
          productId: productId,
          customerWallet: customerWallet,
          expireDate: convertDateToTimestamp(expireDate),
        },
      };
      options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: " 80205640-3cfb-4268-b494-f515f791964b",
        },
        body: JSON.stringify(metadata),
      };
      response = await fetch("https://api.nftport.xyz/v0/metadata", options);
      data = await response.json();
      let tokenURI = data.metadata_uri;
      console.log(tokenURI);
      tokenURI = "https://ipfs.io/ipfs/" + tokenURI.slice(7, tokenURI.length);
      console.log(tokenURI);
      return tokenURI;
    } catch (e) {
      console.log(e);
    }
  }

  function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0)
      byteString = atob(dataURI.split(",")[1]);
    else byteString = unescape(dataURI.split(",")[1]);

    // separate out the mime component
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }
  return (
    <>
      <UploadIcon className="w-9 cursor-pointer hover:text-orange-500 duration-200"></UploadIcon>
      <input
        ref={urlPromoRef}
        onChange={(e) => {
          convertImage(e.target.files[0], setBase64);
        }}
        style={{ color: "black" }}
        className="text-xs font-bold  mt-2 text-center"
        type="file"
      ></input>
      <Button
        loading={loading}
        color="primary"
        onClick={async () => {
          setLoading(true);
          const tokenURI = await uploadMetadata(
            productId,
            customerWallet,
            expireDate,
            base64
          );
          await mintNFT(customerWallet, tokenURI);
          setLoading(false);
        }}
      >
        MINT NFT
      </Button>
    </>
  );
}

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

async function convertImage(image, setBase64) {
  const result = await convertBase64(image);
  setBase64(result);
}

function convertDateToTimestamp(expireDate) {
  const date = new Date(expireDate);
  return date.getTime();
}
