const CatchView = ({status, statusText}: {status: number, statusText: string | null }) => {
    return (
        <div>
            <h1>Fehler beim Laden der Geräteinformation</h1>
            <p>Status: {status}</p>
            <p>Grund: {statusText || 'Keine Ahnung, was das Problem ist'}</p>
            {/*
            <pre>
                <code>{JSON.stringify(caught.data, null, 2)}</code>
            </pre>
*/}
        </div>
    );
}

export default CatchView