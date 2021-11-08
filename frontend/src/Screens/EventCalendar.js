import { Inject,ScheduleComponent ,Day,Week,WorkWeek,Month,Agenda} from '@syncfusion/ej2-react-schedule';
export default function calender() {
 
 return(
<ScheduleComponent>
    <Inject services={[Day,Week,Month,WorkWeek,Agenda]}/>
</ScheduleComponent>
 )
}



