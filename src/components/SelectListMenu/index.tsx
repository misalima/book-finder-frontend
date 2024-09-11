import { IList } from "@/types/list";
import Select, { SingleValue } from "react-select";
import React from "react";

interface SelectListMenuProps {
  lists: IList[];
  onSelect: (selectedList: IList | null) => void;
}

export default function SelectListMenu({
  lists,
  onSelect,
}: SelectListMenuProps) {
  // Mapeando as opções
  const options = lists.map((list) => ({
    value: list.id,
    label: list.name,
  }));

  // Função para lidar com a mudança de seleção
  const handleChange = (
    selectedOption: SingleValue<{ value: string | undefined; label: string }>
  ) => {
    const selectedList = lists.find(
      (list) => list.id === selectedOption?.value
    );
    onSelect(selectedList || null); // Chamando o callback com a lista selecionada
  };

  return (
    <Select
      options={options} // Lista de opções
      onChange={handleChange} // Função chamada quando o valor muda
      placeholder="Selecione uma lista"
      isClearable // Permite limpar a seleção
    />
  );
}
