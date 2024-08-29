import { useRouteError } from "react-router-dom";
import { Result, Button } from "antd";
import {Link} from 'react-router-dom'
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Result
      status="404"
      title="403"
      subTitle={error.statusText || error.message}
      extra={<Button type="primary">
        <Link to='/'> Back Home</Link>
        </Button>}
    />
  );
}
