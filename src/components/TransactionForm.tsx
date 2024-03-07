import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  ListItemIcon,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close"; // 閉じるボタン用のアイコン
import FastfoodIcon from "@mui/icons-material/Fastfood"; //食事アイコン

interface TransactionFormProps {
  onCloseForm: () => void;
  isEntryDrawerOpen: boolean;
}

const TransactionForm = ({ onCloseForm, isEntryDrawerOpen }: TransactionFormProps) => {
  const formWidth = 320;
  return (
    <Box
      sx={{
        position: "fixed",
        top: 64,
        right: isEntryDrawerOpen ? formWidth : "-2%", // フォームの位置を調整
        width: formWidth,
        height: "100%",
        bgcolor: "background.paper",
        zIndex: (theme) => theme.zIndex.drawer - 1,
        // フォーム開閉のアニメーション
        transition: (theme) =>
          theme.transitions.create("right", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        p: 2, // 内部の余白
        boxSizing: "border-box", // ボーダーとパディングをwidthに含める
        boxShadow: "0px 0px 15px -5px #777777",
      }}
    >
      {/* 入力エリアヘッダー */}
      <Box display={"flex"} justifyContent={"space-between"} mb={2}>
        <Typography variant="h6">入力</Typography>
        {/* 閉じるボタン */}
        <IconButton
          onClick={onCloseForm}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {/* フォーム要素 */}
      <Box component={"form"}>
        <Stack spacing={2}>
          {/* 収支切り替えボタン */}
          <ButtonGroup fullWidth>
            <Button variant={"contained"} color="error">
              支出
            </Button>
            <Button>収入</Button>
          </ButtonGroup>
          {/* 日付 */}
          <TextField
            label="日付"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          {/* カテゴリ */}
          <TextField id="カテゴリ" label="カテゴリ" select value={"食費"}>
            <MenuItem value={"食費"}>
              <ListItemIcon>
                <FastfoodIcon />
              </ListItemIcon>
              食費
            </MenuItem>
          </TextField>
          {/* 金額 */}
          <TextField label="金額" type="number" />
          {/* 内容 */}
          <TextField label="内容" type="text" />
          {/* 保存ボタン */}
          <Button type="submit" variant="contained" color={"primary"} fullWidth>
            保存
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
export default TransactionForm;
