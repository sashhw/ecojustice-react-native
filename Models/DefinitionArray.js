import Strings from "../AppStrings";
import { DefinitionModel } from "./DefinitionModel";

let definitionArray = [];

export const initializeDefinitions = () => {
  definitionArray = [
    new DefinitionModel("redlining", Strings.redlining),
    new DefinitionModel(
      "Equal Protection Clause",
      Strings.equalProtectionClause
    ),
    new DefinitionModel("EPA", Strings.epa),
    new DefinitionModel("pesticide", Strings.pesticide),
    new DefinitionModel("contamination", Strings.contamination),
    new DefinitionModel("strike", Strings.strike),
    new DefinitionModel("boycott", Strings.boycott),
    new DefinitionModel("racial segregation", Strings.racialSegregation),
    new DefinitionModel("Court of Appeals", Strings.courtOfAppeals),
    new DefinitionModel("PCB", Strings.pcb),
    new DefinitionModel("detoxification", Strings.detoxification),
    new DefinitionModel("sewage", Strings.sewage),
    new DefinitionModel("carcinogen", Strings.carcinogen),
    new DefinitionModel("Superfund", Strings.superfund),
    new DefinitionModel("reparation", Strings.reparation),
    new DefinitionModel("autonomy", Strings.autonomy),
    new DefinitionModel("gentrification", Strings.gentrification),
    new DefinitionModel("equity", Strings.equity),
  ];
};

export const getDefinitionArray = () => definitionArray;
