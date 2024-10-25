type Props = {
  name?: string;
};

export default function Greet({ name }: Props) {
  return <div>Greet {name}</div>;
}
