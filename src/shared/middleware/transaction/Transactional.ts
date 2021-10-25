import beginTransaction from "./BeginTransaction";
import rollbackTransaction from "./RollbackTransaction";
import commitTransaction from "./CommitTransaction";

const transactional = (f) => [beginTransaction, f, commitTransaction, rollbackTransaction];

export default transactional;
