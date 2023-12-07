function SummaryBox({ restaurant, reviews }) {


    // Can add preferences to users - will be able to add a ForYou section
    // List all 6 accomodations, stored as list [scoreSummary, validReviewCount]
    let gluten = sumReview(reviews, 'gluten_free');
    let nut = sumReview(reviews, 'nut_free');
    let dairy = sumReview(reviews, 'dairy_free');
    let shellfish = sumReview(reviews, 'shellfish');
    let vegetarian = sumReview(reviews, 'vegetarian');
    let vegan = sumReview(reviews, 'vegan');

    // Show address

    return (
        <div>
            {/* <h2> For You:</h2>
            To put here: <br />
            Anything that matches the user's preferences <br />
            Other restaurant detail that we can get, such as opening hours, map embed, etc <br />
            <br />
            <p>Other users say...: Gluten Free (80%)</p> */}
            <h2>Accomodations:</h2>
            <p>Gluten free: {displayAccomodation(gluten)}</p>
            <p>Nuts: {displayAccomodation(nut)}</p>
            <p>Dairy: {displayAccomodation(dairy)}</p>
            <p>Shellfish: {displayAccomodation(shellfish)}</p>
            <p>Vegetarian: {displayAccomodation(vegetarian)}</p>
            <p>Vegan: {displayAccomodation(vegan)}</p>
        </div>
    )
}

function sumReview(reviews, index) {
    let sumAndCount = [0,0];
    reviews.forEach((review) => {
        let accomodationScore = review.accomodations[index];
        if (accomodationScore >= 0 && accomodationScore <= 5) {
            sumAndCount[0] += accomodationScore;
            sumAndCount[1] += 1;
        }
    })
    return sumAndCount;
}

function displayAccomodation(accomodation) {
    return(
        <div>
            {accomodation[1] === 0
            ? <div>{(accomodation[0]/accomodation[1]).toFixed(1)}/5. {accomodation[1]} people rated this.</div>
            : <div>No ratings so far.</div>}
        </div>
    )
}

export default SummaryBox;
