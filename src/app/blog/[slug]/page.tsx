import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const articles: Record<string, { title: string; date: string; tag: string; content: string; description?: string }> = {
  "randonnees-vosges": {
    title: "Les 5 plus belles randonnées autour de Jeuxey",
    date: "2025-03-15",
    tag: "Randonnée",
    description: "Cinq itinéraires pédestres au départ de Jeuxey : lac de Bouzey, forêt d'Épinal, sentier des Dix, cascades de Tendon et tour de Bouzey en VTT.",
    content: `
Les Vosges offrent un terrain de jeu exceptionnel pour les amateurs de randonnée. Selon sentiers-en-france.eu, 30 sentiers balisés représentant plus de 315 km sont accessibles autour de Jeuxey. Le Club Vosgien d'Épinal (clubvosgienepinal.com) propose plus de 270 itinéraires balisés avec traces GPX téléchargeables. Pour la navigation sur le terrain, l'application Komoot est la référence pour les cartes interactives et les profils de dénivelé.

**1. Boucle du Lac de Bouzey** — 11 km · Facile · 3h · Dénivelé 150 m
Depuis Épinal, ce parcours longe le canal d'alimentation du lac et emprunte l'ancienne voie ferrée de la ceinture fortifiée d'Épinal. Le lac de Bouzey, miroir d'eau entouré de forêts, offre une atmosphère paisible tout au long du circuit. Idéal pour une première randonnée familiale dans les Vosges.

**2. Forêt d'Épinal — Roche Charlot et Roche Goutteuse** — 13 km · Facile · 4h
Plongeon dans la forêt communale d'Épinal, l'une des plus grandes forêts urbaines de France. Bien ombragé, le sentier mène aux deux rochers emblématiques offrant des vues dégagées sur la plaine lorraine. Vous croiserez des arbres remarquables plusieurs fois centenaires.

**3. Sentier des Dix — panorama sur Épinal** — 10 km · Facile · 3h · Dénivelé 321 m
Départ depuis la carrière Collot, ce sentier grimpe sur les collines sous-vosgiennes pour offrir plusieurs points de vue spectaculaires sur la ville d'Épinal, la Moselle et les crêtes vosgiennes en arrière-plan.

**4. Cascades de Tendon** — 7,5 km · Modéré · 2h · Dénivelé 300 m
À seulement 35 minutes de Jeuxey, les cascades de Tendon (la Grande et la Petite) sont parmi les plus photographiées des Vosges. Le sentier forestier varié serpente le long du ruisseau dans un cadre sauvage et humide, particulièrement beau au printemps et en automne.

**5. Tour de Bouzey — La Sorcière — Le Sotré** — 26 km · VTT ou pédestre
Ce grand parcours varié alterne entre forêts de résineux, prairies et rives du lac. La montée vers La Sorcière récompense par des panoramas étendus. L'une des sorties incontournables du secteur en version VTT.

Pour préparer vos sorties, rendez-vous sur clubvosgienepinal.com pour les traces GPX ou sur l'application Komoot pour les cartes interactives. Chaussures de marche indispensables, même sur les sentiers cotés facile.
    `,
  },
  "epinal-art-deco": {
    title: "Épinal, capitale de l'image et joyau Art Déco",
    date: "2025-02-20",
    tag: "Culture",
    description: "À 15 minutes de L'Aubier, Épinal révèle sa Basilique Saint-Maurice, son Musée de l'Image unique en Europe, son patrimoine Art Déco et ses bords de Moselle.",
    content: `
À seulement 15 minutes de L'Aubier, Épinal est une ville surprenante qui mêle patrimoine médiéval, architecture Art Déco et culture populaire. Elle mérite largement une demi-journée d'exploration, voire une journée entière.

**La Basilique Saint-Maurice** (XIIe siècle)
Dominant le centre historique, cette basilique romane vosgienne est le monument emblématique d'Épinal. Le cœur historique de la ville s'est développé autour de cet édifice religieux depuis l'époque des évêques de Metz vers 980. Sa construction s'étend du XIIe au XVIe siècle, offrant un mélange harmonieux de styles roman et gothique. À ses pieds s'étend le **Quartier des Chanoinesses**, un ensemble médiéval remarquablement préservé datant du XIIIe siècle, avec ses hôtels particuliers, ruelles pavées et maisons à colombages.

**Le Musée de l'Image**
Unique en Europe, ce musée conserve et valorise l'imagerie populaire d'Épinal depuis 1796. Les célèbres "images d'Épinal" — estampes gravées, coloriées et diffusées dans toute la France — ont traversé les siècles pour illustrer l'histoire, les contes et la vie quotidienne. La collection permanente est saisissante ; les expositions temporaires régulièrement renouvelées.

**L'architecture Art Déco**
Après les destructions de la Première Guerre mondiale, Épinal a été reconstruite dans le style Art Déco des années 1920-1930. Le centre-ville concentre de nombreux hôtels particuliers et bâtiments publics ornés de ferronneries, céramiques et bas-reliefs caractéristiques de cette époque.

**La Moselle, le Canal des Vosges et les espaces naturels**
La Moselle traverse Épinal en son cœur, créant des promenades agréables sur ses berges aménagées. Le Canal des Vosges longe également la ville. Épinal est classée parmi les villes les plus boisées de France. Pour une balade en famille, l'**Arboretum de la Voivre** et le **parc boisé du Mont Carmel** offrent de beaux espaces verts à quelques minutes du centre.

Une visite combinant la basilique, le musée de l'Image, une promenade au bord de la Moselle et un tour dans l'un des parcs constitue une journée complète et très agréable au départ de L'Aubier.
    `,
  },
  "gastronomie-vosgienne": {
    title: "Gastronomie vosgienne : ce qu'il faut goûter",
    date: "2025-01-10",
    tag: "Gastronomie",
    description: "Munster AOP, quiche lorraine, tarte aux myrtilles, mirabelle, Bergkäse, Marcaire… Le guide complet des saveurs vosgiennes et lorraines à découvrir près de Jeuxey.",
    content: `
La Lorraine et les Vosges ont une identité gastronomique forte, marquée par les produits de terroir, les traditions rurales et les recettes transmises de génération en génération. Voici ce qu'il ne faut absolument pas manquer lors de votre séjour à L'Aubier.

**Munster AOP**
Le fromage emblématique des Vosges, à croûte lavée orangée et à pâte molle. Affiné dans des caves vosgiennes, il se décline en version douce (jeune) ou corsée (affiné). À déguster chaud sur une tartine ou accompagné de cumin et pommes de terre — une association classique de la cuisine montagnarde.

**Quiche lorraine**
Contrairement à une idée reçue, la recette traditionnelle ne comprend pas de fromage — et certaines versions authentiques n'incluent pas non plus de lardons. La vraie quiche lorraine se compose d'œufs, de crème fraîche épaisse et d'une pâte brisée fine. Simple, parfaite.

**Tarte aux myrtilles**
Les myrtilles sauvages des Vosges sont ramassées à la main en forêt chaque été. La tarte aux myrtilles vosgiennes est d'une finesse incomparable comparée aux versions industrielles. Goûtez-la dans une boulangerie ou pâtisserie artisanale.

**Eau-de-vie de mirabelle et kirsch vosgien**
La mirabelle de Lorraine est une petite prune dorée AOP, fêtée chaque août à Metz. En tarte, en confiture, en eau-de-vie — elle est l'emblème sucré de la région. Le kirsch vosgien, distillé à partir de cerises, complète la gamme des eaux-de-vie locales à fort caractère.

**Bergkäse et Raclette de montagne**
Les fermes vosgiennes produisent des fromages de montagne à pâte pressée cuite, proches du Bergkäse alpin. Fondants et savoureux, ils se retrouvent dans les fermes-auberges des chaumes (prairies d'altitude). La raclette de montagne vosgienne est une autre spécialité à déguster à la saison froide.

**Marcaire**
Spécialité méconnue des chaumes vosgiennes, le Marcaire est un fromage blanc aux herbes fraîches, servi traditionnellement avec des pommes de terre en robe des champs. On le trouve dans les fermes-auberges d'altitude, souvent dans des cadres magnifiques.

**Marchés locaux d'Épinal**
Le marché du samedi matin à Épinal est l'un des plus animés du département des Vosges. Producteurs locaux, fromagers, maraîchers et artisans s'y retrouvent dans la ville basse. C'est l'occasion idéale de faire le plein de produits frais pour composer un repas vosgien authentique dans votre studio.
    `,
  },
  "architecture-vosges": {
    title: "Architecture contemporaine dans les Vosges — entre bois et modernité",
    date: "2025-04-05",
    tag: "Architecture",
    description: "Bardage mélèze, toits plats, grandes baies vitrées, éco-constructions passives : l'architecture vosgienne contemporaine réinvente le chalet. L'Aubier en est un exemple.",
    content: `
Les Vosges ne sont pas seulement une destination de nature et de randonnée. Elles sont aussi le théâtre discret d'une architecture contemporaine remarquable, où le bois local dialogue avec les exigences modernes du confort, de l'esthétique et de la durabilité.

**Le renouveau du bardage bois**
Le bardage bois est une tradition constructive vosgienne ancienne, mais les architectes contemporains l'ont réinventé. Exit le lambris vieilli, place aux bardages horizontaux en mélèze naturel grisonnant, en cèdre pré-grisé ou en pin traité thermiquement. Ces essences locales vieillissent avec grâce, sans traitement chimique, et s'intègrent parfaitement dans le paysage forestier vosgien.

**Mélèze, cèdre et pin : les bois de l'architecture vosgienne**
Le mélèze est apprécié pour sa durabilité naturelle et sa résistance aux intempéries. Le cèdre, plus stable, offre une teinte chaude qui évolue lentement vers le gris argenté. Le pin traité thermiquement (rétification) devient imputrescible sans adjuvants chimiques. Ces trois essences dominent aujourd'hui l'architecture bois contemporaine dans les Vosges et le Massif Central.

**Le style chalet revisité**
L'influence du chalet vosgien traditionnel est forte, mais les architectes contemporains ont rompu avec ses codes les plus contraignants. Toits plats ou à faible pente, grandes baies vitrées au sud pour capter la lumière hivernale, volumes épurés, ouverture sur la forêt : c'est le chalet du XXIe siècle. Les débords de toit protègent des pluies vosgiennes tout en créant des terrasses couvertes naturelles.

**Éco-constructions et maisons passives**
Les Vosges comptent un nombre croissant de constructions labellisées passives ou à énergie positive. Les ossatures bois isolées au chanvre, les pompes à chaleur géothermiques et les toitures végétalisées se multiplient. Cette dynamique est portée par une filière bois locale active et des artisans formés aux nouvelles techniques.

**L'Aubier : une architecture qui dialogue avec la forêt**
Le studio L'Aubier incarne cette philosophie : bardage cèdre naturel en façade, sol stratifié en lames effet bois à l'intérieur, cuisine vert sauge en résonance avec la végétation extérieure. La terrasse bambous et le brise-vue bois créent une continuité entre l'espace de vie et le jardin. Chaque choix de matériau vise la cohérence avec l'environnement vosgien.

**Francis Hallé et la philosophie de l'aubier**
Francis Hallé, botaniste et défenseur des forêts primaires, a popularisé la notion d'aubier comme métaphore de la vitalité. L'aubier est la partie vivante du bois, entre l'écorce et le cœur — la zone où la sève circule, où l'arbre grandit. Donner ce nom à un studio de location, c'est affirmer une philosophie : construire avec le bois, dans le respect de la forêt qui nous entoure.
    `,
  },
  "week-end-epinal": {
    title: "Week-end à Épinal — que faire en 2 jours ?",
    date: "2025-04-20",
    tag: "Tourisme",
    description: "Programme complet pour un week-end réussi à Épinal depuis L'Aubier : marché, Basilique, Musée de l'Image, randonnée au lac de Bouzey, et route vers Gérardmer.",
    content: `
Vous séjournez à L'Aubier et souhaitez profiter au maximum de votre week-end dans les Vosges ? Voici un programme en deux jours qui combine culture, nature et gastronomie, avec Épinal comme base de départ — à seulement 15 minutes de Jeuxey.

---

**Jour 1 — Épinal et ses trésors**

**Matin : marché et vieille ville**
Si vous arrivez un samedi, commencez par le marché d'Épinal qui se tient le matin dans la ville basse. Producteurs locaux, fromagers, primeurs et artisans s'y retrouvent dans une atmosphère chaleureuse typiquement lorraine. Idéal pour rapporter Munster, mirabelles ou eau-de-vie.

Après le marché, remontez vers la **Basilique Saint-Maurice** (XIIe siècle), monument roman vosgien dominant la vieille ville. Prenez le temps de déambuler dans le **Quartier des Chanoinesses** autour de la basilique, avec ses ruelles médiévales et ses maisons à colombages.

**Après-midi : Musée de l'Image et bords de Moselle**
L'après-midi, consacrez 1h30 au **Musée de l'Image**, unique en Europe. La collection d'images d'Épinal — ces estampes populaires colorées diffusées dans toute la France depuis 1796 — est fascinante et accessible à tous. En sortant, longez les **bords de la Moselle** aménagés pour une promenade digestive.

**Soir : où dîner ?**
Deux adresses recommandées dans le secteur :

**La Grange Obriot** — 64 rue de la Passée, 88460 La Baffe (20 min d'Épinal). Cuisine du terroir vosgien par le chef Claudy Obriot, ancien chef des Ducs de Lorraine. Cadre chaleureux bois et pierre, produits frais et de saison, recettes de nos grands-mères revisitées. Site : lagrangeobriot.com — réservation fortement conseillée.

**Ipso Facto** — 17 rue de la Maix, 88000 Épinal. Ouvert en 2024 en plein cœur du quartier historique. Cuisine française traditionnelle à base de produits frais locaux (œufs Ferme Bourquin, chèvres Ferme des Granges). Terrasse 40 couverts. Note 4,9/5. Tél : 03 29 31 11 44 — ouvert mardi au samedi, midi et soir.

---

**Jour 2 — Nature et grands espaces**

**Matin : randonnée au Lac de Bouzey ou en Forêt d'Épinal**
Deux options selon votre forme :
- **Lac de Bouzey** (11 km, 3h, dénivelé 150 m) — boucle facile longeant le canal et les rives du lac, idéale pour une matinée tranquille.
- **Forêt d'Épinal, Roche Charlot et Roche Goutteuse** (13 km, 4h) — plus sauvage, avec de beaux points de vue depuis les rochers.

**Après-midi : route vers Gérardmer**
À 30 minutes d'Épinal, le **Lac de Gérardmer** est le plus grand lac naturel des Vosges. La promenade autour du lac (11 km, tout plat) est accessible à tous. Si le temps le permet, continuez sur la **Route des Crêtes** pour des panoramas sur les deux versants vosgiens.

---

**Infos pratiques**

- **Parking :** gratuit dans plusieurs parkings du centre-ville d'Épinal, notamment près du marché.
- **Gare SNCF d'Épinal :** à environ 15 minutes de L'Aubier en voiture. Liaisons directes vers Nancy, Metz et Paris.
- **Office de tourisme d'Épinal :** en centre-ville, topoguides et conseils randonnées disponibles.
- **Distance Jeuxey → Gérardmer :** environ 45 minutes par la RD 157.
    `,
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return { title: "Article introuvable" };
  const desc = article.description ?? article.content.trim().slice(0, 155);
  return {
    title: article.title,
    description: desc,
    openGraph: {
      title: `${article.title} | L'Aubier`,
      description: desc,
      url: `https://www.aubier-vosges.fr/blog/${slug}`,
    },
  };
}

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export default async function BlogArticle({ params }: Props) {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#f7f5f0]">
        <div className="bg-[#3a3d42] py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs px-2 py-1 bg-[#c8813a]/30 text-[#e8b87a] rounded-full">
                {article.tag}
              </span>
              <time className="text-xs text-[#8aab94]">
                {new Date(article.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
              </time>
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl italic text-[#f7f5f0]">
              {article.title}
            </h1>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="prose prose-stone max-w-none bg-white rounded-xl p-8 border border-[#b8cfc0]/30">
            {article.content.trim().split("\n\n").map((para, i) => (
              <p key={i} className="text-[#3a3d42] text-sm leading-7 mb-4">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[#b8cfc0]/30 flex items-center justify-between">
            <Link href="/blog" className="text-sm text-[#8aab94] hover:text-[#c8813a] transition-colors">
              ← Retour au blog
            </Link>
            <Link
              href="/reservation"
              className="text-sm bg-[#c8813a] hover:bg-[#e8b87a] text-white px-4 py-2 rounded transition-colors"
            >
              Réserver L&apos;Aubier
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
