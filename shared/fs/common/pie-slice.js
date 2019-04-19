// @flow
import * as Kb from '../../common-adapters'
import * as React from 'react'
import * as Styles from '../../styles/index'

type Props = {|
  degrees: number,
  animated?: boolean,
|}

const PieSliceDefault = (props: Props) => {
  const styleRotate = Styles.isMobile
    ? {transform: [{rotate: props.degrees + 'deg'}]}
    : {transform: 'rotate(' + props.degrees + 'deg)'}
  return (
    <Kb.Box style={styles.container}>
      <Kb.Box style={styles.right1} />
      <Kb.Box style={Styles.collapseStyles([styles.rotateContainer, styleRotate])}>
        <Kb.Box style={styles.left2} />
      </Kb.Box>
      {props.degrees <= 180 ? <Kb.Box style={styles.left1} /> : <Kb.Box style={styles.right2} />}
    </Kb.Box>
  )
}

const PieSlice = (props: Props) => {
  return props.animated ? (
    <Kb.Animated to={{degrees: props.degrees}}>
      {({degrees}) => <PieSliceDefault degrees={degrees} />}
    </Kb.Animated>
  ) : (
    <PieSliceDefault degrees={props.degrees} />
  )
}
const pieSize = Styles.isMobile ? 16 : 12
const pieHalfSize = Styles.isMobile ? 8 : 6
const stylePieHalf = {
  height: pieSize,
  position: 'absolute',
  width: pieHalfSize,
}
const styles = Styles.styleSheetCreate({
  container: {
    height: pieSize,
    position: 'relative',
    width: pieSize,
  },
  left1: {
    ...stylePieHalf,
    backgroundColor: Styles.globalColors.lightGrey,
    // -1 is a workaround for a rendering issue where the blue part of the
    // pie is not entirely hidden by the white part
    borderBottomLeftRadius: pieHalfSize - 1,
    borderTopLeftRadius: pieHalfSize - 1,
    left: 0,
  },
  left2: {
    ...stylePieHalf,
    backgroundColor: Styles.globalColors.blue,
    borderBottomLeftRadius: pieHalfSize,
    borderTopLeftRadius: pieHalfSize,
    left: 0,
  },
  right1: {
    ...stylePieHalf,
    backgroundColor: Styles.globalColors.lightGrey,
    // -1 is a workaround for a rendering issue where the blue part of the
    // pie is not entirely hidden by the white part
    borderBottomRightRadius: pieHalfSize - 1,
    borderTopRightRadius: pieHalfSize - 1,
    left: pieHalfSize,
  },
  right2: {
    ...stylePieHalf,
    backgroundColor: Styles.globalColors.blue,
    borderBottomRightRadius: pieHalfSize,
    borderTopRightRadius: pieHalfSize,
    left: pieHalfSize,
  },
  rotateContainer: {
    height: pieSize,
    left: 0,
    position: 'absolute',
    width: pieSize,
  },
})

export default PieSlice
