import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from "@fullcalendar/daygrid"
import jaLocale from "@fullcalendar/core/locales/ja"
import "../calendar.css"
import { DatesSetArg, EventContentArg } from '@fullcalendar/core'
import { Balance, CalendarContent, Transaction } from '../types'
import { calcDailyBalance } from '../utils/financeCalc'
import { formatCurrency } from '../utils/formatting'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';


interface CalendarProps {
    monthlyTransactions: Transaction[]
    setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
    setCurrentDay: React.Dispatch<React.SetStateAction<string>>
}

const Calendar = (
    { monthlyTransactions, setCurrentMonth, setCurrentDay }: CalendarProps) => {

    const dailyBalance = calcDailyBalance(monthlyTransactions);
    console.log(dailyBalance);

    // Object.keys()はJavascriptのメソッド
    const createCalendarEvents = (dailyBalance: Record<string, Balance>): CalendarContent[] => {
        return Object.keys(dailyBalance).map((date) => {
            const { income, expense, balance } = dailyBalance[date]
            return {
                start: date,
                income: formatCurrency(income),
                expense: formatCurrency(expense),
                balance: formatCurrency(balance),
            }
        });
    }

    const calendarEvents = createCalendarEvents(dailyBalance);

    const renderEventContent = (eventInfo: EventContentArg) => {
        console.log(eventInfo)
        return (
            <div>
                <div className='money' id='event-income'>
                    {eventInfo.event.extendedProps.income}
                </div>
                <div className='money' id='event-expense'>
                    {eventInfo.event.extendedProps.expense}
                </div>
                <div className='money' id='event-balance'>
                    {eventInfo.event.extendedProps.balance}
                </div>
            </div>
        )
    }

    const handleDateSet = (dateSetInfo: DatesSetArg) => {
        console.log(dateSetInfo);
        setCurrentMonth(dateSetInfo.view.currentStart)
    }

    const handleDateClick = (dateInfo: DateClickArg) => {
        console.log(dateInfo);
        setCurrentDay(dateInfo.dateStr);
    }

    return (
        <FullCalendar
            locale={jaLocale}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={calendarEvents}
            eventContent={renderEventContent}
            datesSet={handleDateSet}
            dateClick={handleDateClick}
        />
    )
}

export default Calendar