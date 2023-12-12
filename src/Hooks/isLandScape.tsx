import { Dimensions } from "react-native";

const isLandscape = () => {
    const dim = Dimensions.get('screen');
    return dim.width >= dim.height;
};

export default isLandscape;