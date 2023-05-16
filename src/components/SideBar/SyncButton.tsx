export function SyncButton({
    handleSync,
    isSynced,
}: {
    handleSync: () => Promise<void>
    isSynced: boolean
}) {
    return (
        <button
            onClick={handleSync}
            className={`bg-green-600 text-center font-bold transition-all duration-200 text-white ${
                isSynced ? 'pt-0 pb-0' : 'pt-2 pb-2'
            }`}
        >
            {!isSynced && '♻ SYNC'}
        </button>
    )
}
