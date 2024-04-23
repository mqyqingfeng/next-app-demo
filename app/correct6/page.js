import dayjs from "dayjs";
import Button from './button';
function Time() {
  var now = dayjs().format('DD/MM/YYYY')
  return <div>{ now }</div>;
}
export default function Page() {
  return (
    <>
      <Time />
      <Button />
    </>
  )
}