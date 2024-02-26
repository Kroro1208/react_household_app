import { Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import MovingIcon from '@mui/icons-material/Moving';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Transaction } from '../types';
import { financeCalc } from '../utils/financeCalc';

interface monthlyTransactions {
    monthlyTransactions: Transaction[]
}

function MonthlySummary({ monthlyTransactions }: monthlyTransactions) {
    const { income, expense, balance } = financeCalc(monthlyTransactions);
    return (
        <Grid container spacing={{ xs: 1, sm: 2 }} mb={2}>
            {/* 収入 */}
            <Grid item xs={4} display={"flex"} flexDirection={'column'}>
                <Card sx={{
                    bgcolor: (theme) => theme.palette.incomeColor.main,
                    color: "white",
                    borderRadius: "10px",
                    flexGrow: 1
                }} >
                    <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
                        <Stack direction={"row"}>
                            <MovingIcon sx={{ fontsize: "2rem" }} />
                            <Typography>収入</Typography>
                        </Stack>
                        <Typography textAlign={"center"} variant='h5' fontWeight={"fontWeightBold"}
                            sx={{ wordBreak: "break-word", fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" } }}
                        >¥{income}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            {/* 支出 */}
            <Grid item xs={4} display={"flex"} flexDirection={'column'}>
                <Card sx={{
                    bgcolor: (theme) => theme.palette.expenseColor.main,
                    color: "white",
                    borderRadius: "10px",
                    flexGrow: 1
                }} >
                    <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
                        <Stack direction={"row"}>
                            <TrendingDownIcon sx={{ fontsize: "2rem" }} />
                            <Typography>支出</Typography>
                        </Stack>
                        <Typography textAlign={"center"} variant='h5' fontWeight={"fontWeightBold"}
                            sx={{ wordBreak: "break-word", fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" } }}
                        >¥{expense}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            {/* 残高 */}
            <Grid item xs={4} display={"flex"} flexDirection={'column'}>
                <Card sx={{
                    bgcolor: (theme) => theme.palette.balanceColor.main,
                    color: "white",
                    borderRadius: "10px",
                    flexGrow: 1
                }} >
                    <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
                        <Stack direction={"row"}>
                            <AccountBalanceIcon sx={{ fontsize: "2rem" }} />
                            <Typography>残高</Typography>
                        </Stack>
                        <Typography textAlign={"center"} variant='h5' fontWeight={"fontWeightBold"}
                            sx={{ wordBreak: "break-word", fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" } }}
                        >¥{balance}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default MonthlySummary