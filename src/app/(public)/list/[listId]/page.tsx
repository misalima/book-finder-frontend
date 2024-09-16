export default function Page({ params }: { params: { listId: string } }) {
    return (
        <>
        <div>{params.listId}</div>
        </>
    )
};
