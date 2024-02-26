import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from "@fullcalendar/daygrid"
import jaLocale from "@fullcalendar/core/locales/ja"
import "../calendar.css"
import { EventContentArg } from '@fullcalendar/core'
import { Balance, CalendarContent, Transaction } from '../types'
import { calcDailyBalance } from '../utils/financeCalc'
import { formatCurrency } from '../utils/formatting'


interface CalendarProps {
    monthlyTransactions: Transaction[]
}

const Calendar = ({ monthlyTransactions }: CalendarProps) => {

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
                balance: formatCurrency(balance)
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

    return (
        <FullCalendar
            locale={jaLocale}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={calendarEvents}
            eventContent={renderEventContent}
        />
    )
}

export default Calendar