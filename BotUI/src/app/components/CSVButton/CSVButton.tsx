import { Button } from "@mui/material";
import { saveAs } from "file-saver";
import { parse } from "json2csv";
import { WordData } from "@/app/general/interfaces";
import { styles } from "@/app/components/CSVButton/CSVButton.style";

export default function CSVButton({ queryWords }: { queryWords: WordData[] }) {
    const handleDownload = () => {
        const csv = parse(queryWords);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "data.csv");
    };

    return (
        <Button
            variant="contained"
            color="primary"
            onClick={handleDownload}
            sx={styles.button}
        >
            Download Results
        </Button>
    );
}
