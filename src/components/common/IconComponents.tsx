import FastfoodIcon from '@mui/icons-material/Fastfood';
import { ExpenseCategory, IncomeCategory } from '../../types';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import SchoolIcon from '@mui/icons-material/School';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import PetsIcon from '@mui/icons-material/Pets';
import MoneyIcon from '@mui/icons-material/Money';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaidIcon from '@mui/icons-material/Paid';

const IconComponents: Record<IncomeCategory | ExpenseCategory, JSX.Element> = {
    食費: <FastfoodIcon fontSize="small" />,
    日用品: <LocalGroceryStoreIcon fontSize="small" />,
    住居費: <HomeWorkIcon fontSize="small" />,
    交際費: <Diversity3Icon fontSize="small" />,
    趣味: <SportsEsportsIcon fontSize="small" />,
    旅費: <LocalAirportIcon fontSize="small" />,
    勉強: <SchoolIcon fontSize="small" />,
    教育費: <ChildCareIcon fontSize="small" />,
    保健: <LocalHospitalIcon fontSize="small" />,
    医療費: <VaccinesIcon fontSize="small" />,
    ペット: <PetsIcon fontSize="small" />,
    副収入: <PaidIcon fontSize="small" />,
    給与: <AttachMoneyIcon fontSize="small" />,
    お小遣い: <MoneyIcon fontSize="small" />
};

export default IconComponents;