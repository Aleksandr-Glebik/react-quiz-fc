interface AuxilliaryType {
    children?: React.ReactNode
  }

const Auxilliary: React.FC<AuxilliaryType> =( { children } ) => {
    return (
        <>
            { children }
        </>
    )
}

export default Auxilliary
