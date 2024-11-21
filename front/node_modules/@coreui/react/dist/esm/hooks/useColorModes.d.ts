import { Dispatch, SetStateAction } from 'react';
interface UseColorModesOutput {
    colorMode: string | undefined;
    isColorModeSet: () => boolean;
    setColorMode: Dispatch<SetStateAction<string>>;
}
export declare const useColorModes: (localStorageItemName?: string) => UseColorModesOutput;
export {};
