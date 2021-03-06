const React = require('react')
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Grid from 'react-bootstrap/lib/Grid'
import Style from "./NutritionEstimateStyles.js"

export default class NutritionEstimateJSX extends React.Component {
  getInPhoodLogo() {
    return(
      <span>
        <span style={{color:'black'}}>i</span>
        <span style={{color:'green'}}>n</span>
        <span style={{color:'blue'}}>P</span>
        <span style={{color:'red'}}>h</span>
        <span style={{color:'green'}}>o</span>
        <span style={{color:'blue'}}>o</span>
        <span style={{color:'red'}}>d</span>
        .com
      </span>
    )
  }
  getGeneratedStatement(displayGeneratedStatement) {
    if (displayGeneratedStatement === true) {
      return(
              <a href="http://www.inphood.com"
                 className="text-center">
                <h6>Estimated at {this.getInPhoodLogo()}</h6>
              </a>
            )
    } else {
      return
    }
  }
  render() {
    const myStyles = new Style()
    let resultIsNan = false

    // const embed = this.props.embed === 'true'
    const embed = true

    let displayGeneratedStatement = this.props.displayGeneratedStatement
    if (displayGeneratedStatement === undefined) {
      displayGeneratedStatement = false
    }
    let ingredientComposite = this.props.ingredientComposite
    if (ingredientComposite === undefined) {
      const nutritionModel = this.props.nutritionModel
      if (nutritionModel != undefined) {
        ingredientComposite = nutritionModel.getScaledCompositeIngredientModel()
      }
    } else {
      // Commented out - this shouldn't be here--we want this file common to both
      // the website and nutritionLabel.  TODO: work with PBJ to fix this:
      //
      // resultIsNan = isNaN(ingredientComposite.getCalories())
      // if (resultIsNan)
      //   return <ProgressBar active now={50} bsStyle="info" />
    }

    const servingSizeSentence =
      "Serving Size " +
      ingredientComposite.getDisplayServingCount() + " " + ingredientComposite.getDisplayServingUnit() +
      " (" + ingredientComposite.getServingAmount() + ingredientComposite.getServingUnit() + ")"

    let edgeCols = [0, 0, 0, 0]
    let centerCols = [12, 12, 12, 12]
    if (!embed) {
      edgeCols = [2, 3, 3.5, 4]
      centerCols = [8, 6, 5, 4]
    }

    const edgeCol = <Col xs={edgeCols[0]}
                         sm={edgeCols[1]}
                         md={edgeCols[2]}
                         lg={edgeCols[3]} />

    return(
      <Grid>
        <Row>
          {edgeCol}

          <Col xs={centerCols[0]}
               sm={centerCols[1]}
               md={centerCols[2]}
               lg={centerCols[3]}
               className="center-block">
            <section style={myStyles.performanceFacts}>
              <header style={myStyles.performanceFactsHeader}>
                <h1 style={myStyles.performanceFactsTitle}>Nutrition Facts</h1>
                <p style={myStyles.perfomanceFactsHeaderElementP}>{servingSizeSentence}</p>
              </header>
              <table style={myStyles.performanceFactsTable}>
                <thead>
                  <tr>
                    <th
                      colSpan={3}
                      style={{...myStyles.performanceFactsTableElementTheadTrTh,
                              ...myStyles.smallInfo}}>
                      Amount Per Serving
                    </th>
                  </tr>
                </thead>
                <tbody>

                  <tr>
                    <th colSpan={2} style={myStyles.performanceFactsTableElementTh}>
                      <b>Calories </b>
                      {ingredientComposite.getCalories()}
                    </th>
                    <td style={myStyles.performanceFactsTableElementTdLastChild}>
                      Calories from Fat&nbsp;
                      {ingredientComposite.getCaloriesFromFat()}
                    </td>
                  </tr>

                  <tr className="thick-row">
                    <td colSpan={3}
                      style={{...myStyles.smallInfo,
                              ...myStyles.performanceFactsTableElementTdLastChild,
                              ...myStyles.performanceFactsTableClassThickRowTd}}>
                      <b>% Daily Value*</b>
                    </td>
                  </tr>

                  <tr>
                    <th colSpan={2} style={myStyles.performanceFactsTableElementTh}>
                      <b>Total Fat </b>
                      {ingredientComposite.getTotalFatPerServing()}
                      {ingredientComposite.getTotalFatUnit()}
                    </th>
                    <td style={myStyles.performanceFactsTableElementTdLastChild}>
                      <b>{ingredientComposite.getTotalFatRDA()}%</b>
                    </td>
                  </tr>

                  <tr>
                    <td
                      style={{...myStyles.performanceFactsTableElementTd,
                              ...myStyles.performanceFactsTableClassBlankCell}}>
                    </td>
                    <th style={myStyles.performanceFactsTableElementTh}>
                      Saturated Fat&nbsp;
                      {ingredientComposite.getSaturatedFatPerServing()}
                      {ingredientComposite.getSaturatedFatUnit()}
                    </th>
                    <td style={myStyles.performanceFactsTableElementTdLastChild}>
                      <b>{ingredientComposite.getSaturatedFatRDA()}%</b>
                    </td>
                  </tr>

                  <tr>
                    <td
                      style={{...myStyles.performanceFactsTableElementTd,
                              ...myStyles.performanceFactsTableClassBlankCell}}>
                    </td>
                    <th style={myStyles.performanceFactsTableElementTh}>
                      Trans Fat&nbsp;
                      {ingredientComposite.getTransFatPerServing()}
                      {ingredientComposite.getTransFatUnit()}
                    </th>
                    <td style={myStyles.performanceFactsTableElementTdLastChild}>
                    </td>
                  </tr>

                  <tr>
                    <th colSpan={2} style={myStyles.performanceFactsTableElementTh}>
                      <b>Cholesterol </b>
                      {ingredientComposite.getCholestorol()}
                      {ingredientComposite.getCholestorolUnit()}
                    </th>
                    <td style={myStyles.performanceFactsTableElementTdLastChild}>
                      <b>{ingredientComposite.getCholestorolRDA()}%</b>
                    </td>
                  </tr>

                  <tr>
                    <th colSpan={2} style={myStyles.performanceFactsTableElementTh}>
                      <b>Sodium </b>
                      {ingredientComposite.getSodium()}
                      {ingredientComposite.getSodumUnit()}
                    </th>
                    <td style={myStyles.performanceFactsTableElementTdLastChild}>
                      <b>{ingredientComposite.getSodiumRDA()}%</b>
                    </td>
                  </tr>

                  <tr>
                    <th colSpan={2} style={myStyles.performanceFactsTableElementTh}>
                      <b>Total Carbohydrate </b>
                      {ingredientComposite.getTotalCarbohydratePerServing()}
                      {ingredientComposite.getTotalCarbohydrateUnit()}
                    </th>
                    <td style={myStyles.performanceFactsTableElementTdLastChild}>
                      <b>{ingredientComposite.getTotalCarbohydrateRDA()}%</b>
                    </td>
                  </tr>

                  <tr>
                    <td
                      style={{...myStyles.performanceFactsTableElementTd,
                              ...myStyles.performanceFactsTableClassBlankCell}}>
                    </td>
                    <th style={myStyles.performanceFactsTableElementTh}>
                      Dietary Fiber&nbsp;
                      {ingredientComposite.getDietaryFiber()}
                      {ingredientComposite.getDietaryFiberUnit()}
                    </th>
                    <td style={myStyles.performanceFactsTableElementTdLastChild}>
                      <b>{ingredientComposite.getDietaryFiberRDA()}%</b>
                    </td>
                  </tr>

                  <tr>
                    <td
                      style={{...myStyles.performanceFactsTableElementTd,
                              ...myStyles.performanceFactsTableClassBlankCell}}>
                    </td>
                    <th style={myStyles.performanceFactsTableElementTh}>
                      Sugars&nbsp;
                      {ingredientComposite.getSugars()}
                      {ingredientComposite.getSugarsUnit()}
                    </th>
                    <td style={myStyles.performanceFactsTableElementTdLastChild}>
                    </td>
                  </tr>

                  <tr style={myStyles.thickEnd}>
                    <th colSpan={2} style={myStyles.performanceFactsTableElementTh}>
                      <b>Protein </b>
                      {ingredientComposite.getTotalProteinPerServing()}
                      {ingredientComposite.getTotalProteinUnit()}
                    </th>
                    <td style={myStyles.performanceFactsTableElementTdLastChild}>
                    </td>
                  </tr>

                </tbody>
              </table>
              <p style={myStyles.smallInfo}>* Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs:</p>
            </section>
          </Col>

          {edgeCol}
        </Row>

        <Row>
          {edgeCol}

          <Col xs={centerCols[0]}
               sm={centerCols[1]}
               md={centerCols[2]}
               lg={centerCols[3]}>
            {this.getGeneratedStatement(displayGeneratedStatement)}
          </Col>

          {edgeCol}
        </Row>
      </Grid>
    )
  }
}
