import React from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
} from "@chakra-ui/react";
import { useMcaContext } from "../../apis/mca/McaContext";

const McaLoading: React.FC = () => {
  const { connect } = useMcaContext();
  function clickJoin() {
    console.log("click join");
    if (connect) {
      connect("mmmcatoken");
    }
  }
  return (
    <div>
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>You need to connect to webscoket!</AlertTitle>
        <AlertDescription>
          <Button colorScheme="blue" onClick={clickJoin}>
            Connect
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
};
export default McaLoading;
