import { ShowHero } from './components/ShowHero'
import { ShowOverview } from './components/ShowOverview'
import { ShowOffer } from './components/ShowOffer.'

export function ShowPage() {
    return (
        <div className="w-full">
            <ShowHero />
            <ShowOverview />
            <ShowOffer />
        </div>
    )
}
