interface Props {
  validationArray: string[]
}

export function ValidationErrors({ validationArray }: Props) {
  return (
    <ul>
      {validationArray.map((validationError: string, index: number) => {
        return <li className="font-semibold text-red-500" key={index}>
          {validationError}
        </li>
      })}
    </ul>
  )
}