"use client";
import { styles } from "./Header.style";
import { Box, Typography } from "@mui/material";
import { HeaderProps } from "@/app/general/interfaces";

export default function Header({ text }: HeaderProps) {
    return (
        <Box component="header" sx={styles.box}>
            <Typography variant="h4" component="h1">
                {text}
            </Typography>
        </Box>
    );
}
