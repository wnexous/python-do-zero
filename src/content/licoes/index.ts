import type { ComponentType } from "react";

import OQueEProgramar from "./o-que-e-programar";
import Print from "./print";
import Variaveis from "./variaveis";
import Tipos from "./tipos";
import Strings from "./strings";
import Numeros from "./numeros";
import Input from "./input";
import Booleanos from "./booleanos";
import Condicionais from "./condicionais";
import MatchCase from "./match-case";
import While from "./while";
import For from "./for";
import Listas from "./listas";
import Tuplas from "./tuplas";

// slug -> componente da lição
export const LICOES: Record<string, ComponentType> = {
  "o-que-e-programar": OQueEProgramar,
  print: Print,
  variaveis: Variaveis,
  tipos: Tipos,
  strings: Strings,
  numeros: Numeros,
  input: Input,
  booleanos: Booleanos,
  condicionais: Condicionais,
  "match-case": MatchCase,
  while: While,
  for: For,
  listas: Listas,
  tuplas: Tuplas,
};
