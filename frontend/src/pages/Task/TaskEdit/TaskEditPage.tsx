import { useParams } from "react-router-dom";

type Props = {};

export default function TaskEditPage({}: Props) {
  const { id } = useParams();
  return <div>TaskEditPage {id}</div>;
}
