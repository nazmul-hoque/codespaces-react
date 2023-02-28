import React, { createContext, useContext, useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/system";

// interface IColorModeContext{
//     toggleColorMode: ()=>void;
//     mode:"dark"|"light";
// }
//const ColorModeContext =createContext<IColorModeContext>({

const ColorModeContext =createContext({
    toggleColorMode: ()=>{},
    mode:"light",
})

export const ColorModeContextProvider=({children})=>{
    const [mode, setMode]= useState("light");
    const colorMode = useMemo(() => ({
        toggleColorMode: () => {
          setMode((prevMode) => prevMode === "light" ? "dark" : "light");
        },
        mode
      }), [mode]);


const theme =useMemo(
    ()=> 
        createTheme({
            palette:{
                mode,
                primary:{
                    main:"#5cbc63",
                    contrastText: "#fff",
                },
                secondary:{
                    main:"#000000",
                }
            },
            typography:{
                h3:{
                    fontFamily:"CeraPro-Bold",
                },
                h4:{
                    fontFamily:"CeraPro-Bold",
                    color:"#484848",
                }
            }
        }),[mode]
    );
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme ={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export const useColorMode=()=>useContext(ColorModeContext)
