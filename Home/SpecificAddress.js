import { Center, NativeBaseProvider } from "native-base";
import React, { createRef } from "react";
import { View, Text , TouchableOpacity} from "react-native";

const SpecificAddress = ({ navigation }) => {
  return (
    <NativeBaseProvider>
        <Center flex={1}>
            <Text>native</Text>
            <Text>native</Text>
            <Text>native</Text>
            <Text>native</Text>
            <Text>native</Text>
            <Text>native</Text>
            <Text>native</Text>
        </Center>
    </NativeBaseProvider>
  );
};

export default SpecificAddress;
