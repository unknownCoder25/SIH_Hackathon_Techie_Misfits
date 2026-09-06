import logging
logger = logging.getLogger(__name__)

from sqlalchemy.orm import Session

from ..schemas.recommendation import (
    RecommendationRequest,
    RecommendationResponse,
    StandardRecommendation,
)


def recommend_standards_rulebased(request: RecommendationRequest) -> RecommendationResponse:
    specification = request.specification.lower()
    recommendations = []

    if "led" in specification or "street light" in specification:
        recommendations.append(
            StandardRecommendation(
                is_number="IS XXXXX", title="LED Lighting Requirements",
                category="Electrical / Lighting", relevance_score=0.94,
                reason="The specification contains LED lighting and street-lighting requirements.",
                status="Active", related_standards=["IS YYYYY", "IS ZZZZZ"]
            )
        )
    if "electrical" in specification or "220v" in specification:
        recommendations.append(
            StandardRecommendation(
                is_number="IS YYYYY", title="Electrical Safety Requirements",
                category="Electrical", relevance_score=0.87,
                reason="The specification contains electrical voltage and safety-related requirements.",
                status="Active", related_standards=["IS XXXXX"]
            )
        )
    if "ip66" in specification:
        recommendations.append(
            StandardRecommendation(
                is_number="IS ZZZZZ", title="Protection Against Environmental Conditions",
                category="Protection / Enclosure", relevance_score=0.82,
                reason="The specification requires IP66 protection, indicating environmental protection requirements.",
                status="Active", related_standards=[]
            )
        )
    if not recommendations:
        recommendations.append(
            StandardRecommendation(
                is_number="NO_MATCH", title="No standard found", category="Unknown",
                relevance_score=0.0,
                reason="No matching standards were found in the current prototype dataset.",
                status="Unknown", related_standards=[]
            )
        )

    recommendations.sort(key=lambda x: x.relevance_score, reverse=True)
    return RecommendationResponse(query=request.specification, recommendations=recommendations)


def recommend_standards_semantic(request: RecommendationRequest, db: Session) -> RecommendationResponse:
    """Goes through ai.config.get_retriever() — never through a
    specific embedding model or vector DB by name."""

    from ai.config import get_retriever

    matches = get_retriever().search(request.specification, top_k=3, domain=request.domain)

    recommendations = [
        StandardRecommendation(
            is_number=match["is_code"],
            title=match["title"],
            category=match.get("department", "Uncategorized"),
            relevance_score=match["score"],
            reason=f"Semantically matched user query with {match['score'] * 100:.1f}% confidence.",
            status="Active",
            related_standards=[]  # TODO: pull from StandardDependency table
        )
        for match in matches
    ]
    return RecommendationResponse(query=request.specification, recommendations=recommendations)



def recommend_standards(request: RecommendationRequest, db: Session | None = None) -> RecommendationResponse:
    if db is not None:
        try:
            return recommend_standards_semantic(request, db)
        except Exception:
            logger.exception("Semantic search failed, falling back to rule-based matching.")
    return recommend_standards_rulebased(request)
