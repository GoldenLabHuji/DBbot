"use client";
import { styles } from "./Footer.style";
import { Box, Typography } from "@mui/material";

export default function Footer() {
    return (
        <Box component="footer" sx={styles.box}>
            <Typography variant="caption">Powered by dbBot</Typography>
        </Box>
    );
}
