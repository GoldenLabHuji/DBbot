export const styles = {
    container: {
        bot: {
            display: "flex",
            mb: 2,
            justifyContent: "flex-start",
        },
        user: {
            display: "flex",
            mb: 2,
            justifyContent: "flex-end",
        },
    },
    box: {
        bot: {
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
        },
        user: {
            display: "flex",
            alignItems: "center",
            flexDirection: "row-reverse",
        },
    },
    avatar: {
        bot: {
            bgcolor: "primary.main",
        },
        user: {
            bgcolor: "secondary.main",
        },
    },
    paper: {
        bot: {
            ml: 1,
            mr: 0,
            backgroundColor: "primary.light",
            borderRadius: "20px 20px 20px 5px",
        },
        user: {
            ml: 0,
            mr: 1,
            backgroundColor: "secondary.light",
            borderRadius: "20px 20px 20px 5px",
        },
    },
    text: {
        p: 1.5,
        mr: 1,
        whiteSpace: "pre-wrap",
    },
};
