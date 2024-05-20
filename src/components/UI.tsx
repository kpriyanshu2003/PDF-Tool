export default function UI({ theme }: { theme: boolean }) {
  return (
    <>
      {theme ? (
        <Uno name="hola" email="admin@email.com" phone="12345" />
      ) : (
        <Dos name="hola" email="admin@email.com" phone="12345" />
      )}
    </>
  );
}

function Uno({
  name,
  email,
  phone,
}: {
  name: string;
  email: string;
  phone: string;
}) {
  return (
    <div className="bg-white text-violet-600">
      <div>{name}</div>
      <div>{email}</div>
      <div>{phone}</div>
    </div>
  );
}

function Dos({
  name,
  email,
  phone,
}: {
  name: string;
  email: string;
  phone: string;
}) {
  return (
    <div className="bg-black text-white">
      <div>{name}</div>
      <div>{email}</div>
      <div>{phone}</div>
    </div>
  );
}
