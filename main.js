'use strict';
/* ═══════════════════════════════════════════════════════════════════
   WC 2026 — Main Application Logic
   ═══════════════════════════════════════════════════════════════════ */

// ── TEAMS DATA ────────────────────────────────────────────────────────
const TEAMS = {
  'France': { flag: '🇫🇷',
    coach: 'Didier Deschamps', formation: '4-3-3', confederation: 'UEFA', titles: 2,
    players: [
      // ─── GARDIENS (3) ─────────────────────────────────────────────
      { id: 'fr1', name: 'Mike MAIGNAN', pos: 'Gardien', n: 16, age: 30, born: '03/07/1995', h: '1m91', club: 'AC Milan', caps: 30, goals: 0, ast: 0, debut: '08/09/2020', photo: 'images/players/tm_mike_maignan.jpg', role: 'Titulaire', bio: 'Gardien titulaire des Bleus depuis 2022. L\'un des meilleurs gardiens du monde à l\'AC Milan.',
        career: [
          { club: 'Paris Saint-Germain', from: 2012, to: 2015, apps: 0, goals: 0, ast: 0, yc: 0, rc: 0 },
          { club: 'Caen (prêt)', from: 2014, to: 2015, apps: 23, goals: 0, ast: 0, yc: 1, rc: 0 },
          { club: 'Toulouse FC (prêt)', from: 2015, to: 2016, apps: 19, goals: 0, ast: 0, yc: 1, rc: 0 },
          { club: 'LOSC Lille', from: 2015, to: 2021, apps: 198, goals: 0, ast: 2, yc: 12, rc: 0 },
          { club: 'AC Milan', from: 2021, to: null, apps: 163, goals: 0, ast: 1, yc: 11, rc: 1 },
        ] },
      { id: 'fr2', name: 'Brice SAMBA', pos: 'Gardien', n: 1, age: 31, born: '25/04/1994', h: '1m87', club: 'Stade Rennais', caps: 6, goals: 0, ast: 0, debut: '24/03/2022', photo: 'images/players/tm_brice_samba.jpg', role: 'Remplaçant', bio: 'Gardien expérimenté, doublure fiable des Bleus.',
        career: [
          { club: 'Marseille / prêts', from: 2012, to: 2016, apps: 22, goals: 0, ast: 0, yc: 1, rc: 0 },
          { club: 'Caen', from: 2016, to: 2018, apps: 55, goals: 0, ast: 0, yc: 3, rc: 0 },
          { club: 'Nottingham Forest', from: 2018, to: 2022, apps: 89, goals: 0, ast: 0, yc: 3, rc: 0 },
          { club: 'RC Lens', from: 2022, to: 2025, apps: 110, goals: 0, ast: 0, yc: 4, rc: 0 },
          { club: 'Stade Rennais', from: 2025, to: null, apps: 12, goals: 0, ast: 0, yc: 1, rc: 0 },
        ] },
      { id: 'fr3', name: 'Robin RISSER', pos: 'Gardien', n: 23, age: 22, born: '15/02/2004', h: '1m92', club: 'RC Lens', caps: 1, goals: 0, ast: 0, debut: '22/03/2025', photo: 'https://img.sofascore.com/api/v1/player/1387161/image', role: 'Remplaçant', bio: 'Jeune gardien du RC Lens, appelé en remplacement de Lucas Chevalier. Première sélection en 2025.',
        career: [
          { club: 'RC Lens (formation)', from: 2020, to: 2023, apps: 0, goals: 0, ast: 0, yc: 0, rc: 0 },
          { club: 'RC Lens', from: 2023, to: null, apps: 38, goals: 0, ast: 0, yc: 2, rc: 0 },
        ] },

      // ─── DÉFENSEURS (9) ───────────────────────────────────────────
      { id: 'fr4', name: 'William SALIBA', pos: 'Défenseur', n: 17, age: 25, born: '24/03/2001', h: '1m92', club: 'Arsenal FC', caps: 28, goals: 1, ast: 2, debut: '08/10/2022', photo: 'images/players/tm_william_saliba.jpg', role: 'Titulaire', bio: 'Pilier d\'Arsenal et de la défense française. Élu dans l\'équipe-type de Premier League.',
        career: [
          { club: 'AS Saint-Étienne', from: 2019, to: 2020, apps: 16, goals: 0, ast: 0, yc: 3, rc: 0 },
          { club: 'OGC Nice (prêt)', from: 2020, to: 2021, apps: 14, goals: 0, ast: 1, yc: 2, rc: 0 },
          { club: 'Olympique Marseille (prêt)', from: 2021, to: 2022, apps: 36, goals: 1, ast: 2, yc: 4, rc: 0 },
          { club: 'Arsenal FC', from: 2022, to: null, apps: 112, goals: 3, ast: 4, yc: 8, rc: 0 },
        ] },
      { id: 'fr5', name: 'Dayot UPAMECANO', pos: 'Défenseur', n: 4, age: 27, born: '27/10/1998', h: '1m86', club: 'Bayern Munich', caps: 35, goals: 1, ast: 1, debut: '08/10/2020', photo: 'images/players/tm_dayot_upamecano.jpg', role: 'Titulaire', bio: 'Défenseur central du Bayern Munich, taulier des Bleus.',
        career: [
          { club: 'RB Salzburg', from: 2015, to: 2017, apps: 26, goals: 1, ast: 0, yc: 4, rc: 0 },
          { club: 'RB Leipzig', from: 2017, to: 2021, apps: 110, goals: 3, ast: 3, yc: 18, rc: 1 },
          { club: 'Bayern Munich', from: 2021, to: null, apps: 142, goals: 4, ast: 5, yc: 22, rc: 2 },
        ] },
      { id: 'fr6', name: 'Jules KOUNDÉ', pos: 'Défenseur', n: 5, age: 27, born: '12/11/1998', h: '1m80', club: 'FC Barcelone', caps: 45, goals: 2, ast: 4, debut: '08/10/2020', photo: 'https://img.sofascore.com/api/v1/player/827212/image', role: 'Titulaire', bio: 'Latéral droit polyvalent du FC Barcelone.',
        career: [
          { club: 'Girondins Bordeaux', from: 2018, to: 2019, apps: 24, goals: 1, ast: 1, yc: 3, rc: 0 },
          { club: 'Sevilla FC', from: 2019, to: 2022, apps: 95, goals: 4, ast: 5, yc: 14, rc: 1 },
          { club: 'FC Barcelone', from: 2022, to: null, apps: 112, goals: 5, ast: 8, yc: 16, rc: 0 },
        ] },
      { id: 'fr7', name: 'Theo HERNÁNDEZ', pos: 'Défenseur', n: 19, age: 28, born: '06/10/1997', h: '1m84', club: 'AC Milan', caps: 45, goals: 4, ast: 6, debut: '07/10/2021', photo: 'https://img.sofascore.com/api/v1/player/788027/image', role: 'Titulaire', bio: 'Latéral gauche offensif de l\'AC Milan, dynamisme et puissance.',
        career: [
          { club: 'Atlético Madrid', from: 2014, to: 2017, apps: 5, goals: 0, ast: 0, yc: 1, rc: 0 },
          { club: 'Alavés (prêt)', from: 2016, to: 2017, apps: 28, goals: 0, ast: 4, yc: 7, rc: 0 },
          { club: 'Real Betis (prêt)', from: 2017, to: 2018, apps: 32, goals: 1, ast: 5, yc: 9, rc: 0 },
          { club: 'Real Madrid', from: 2017, to: 2019, apps: 4, goals: 0, ast: 0, yc: 0, rc: 0 },
          { club: 'Real Sociedad (prêt)', from: 2018, to: 2019, apps: 34, goals: 2, ast: 5, yc: 8, rc: 0 },
          { club: 'AC Milan', from: 2019, to: null, apps: 203, goals: 28, ast: 38, yc: 38, rc: 2 },
        ] },
      { id: 'fr8', name: 'Ibrahima KONATÉ', pos: 'Défenseur', n: 15, age: 26, born: '25/05/1999', h: '1m94', club: 'Liverpool FC', caps: 24, goals: 2, ast: 1, debut: '25/03/2021', photo: 'https://img.sofascore.com/api/v1/player/826215/image', role: 'Remplaçant', bio: 'Défenseur central de Liverpool, allie puissance physique et technique.',
        career: [
          { club: 'RB Leipzig', from: 2017, to: 2021, apps: 95, goals: 4, ast: 3, yc: 12, rc: 0 },
          { club: 'Liverpool FC', from: 2021, to: null, apps: 112, goals: 6, ast: 4, yc: 10, rc: 0 },
        ] },
      { id: 'fr9', name: 'Lucas HERNÁNDEZ', pos: 'Défenseur', n: 21, age: 30, born: '14/02/1996', h: '1m84', club: 'PSG', caps: 38, goals: 0, ast: 2, debut: '23/03/2018', photo: 'https://img.sofascore.com/api/v1/player/352370/image', role: 'Remplaçant', bio: 'Champion du Monde 2018, polyvalent en défense.',
        career: [
          { club: 'Atlético Madrid', from: 2014, to: 2019, apps: 132, goals: 2, ast: 5, yc: 22, rc: 2 },
          { club: 'Alavés (prêt)', from: 2016, to: 2017, apps: 23, goals: 1, ast: 2, yc: 6, rc: 0 },
          { club: 'Bayern Munich', from: 2019, to: 2024, apps: 106, goals: 1, ast: 8, yc: 15, rc: 1 },
          { club: 'PSG', from: 2024, to: null, apps: 32, goals: 0, ast: 2, yc: 5, rc: 0 },
        ] },
      { id: 'fr10', name: 'Lucas DIGNE', pos: 'Défenseur', n: 3, age: 32, born: '20/07/1993', h: '1m78', club: 'Aston Villa', caps: 54, goals: 2, ast: 8, debut: '05/03/2014', photo: 'images/players/tm_lucas_digne.jpg', role: 'Remplaçant', bio: 'Latéral gauche expérimenté d\'Aston Villa, plus de 50 sélections.',
        career: [
          { club: 'LOSC Lille', from: 2012, to: 2013, apps: 28, goals: 0, ast: 3, yc: 5, rc: 0 },
          { club: 'Paris Saint-Germain', from: 2013, to: 2015, apps: 35, goals: 0, ast: 4, yc: 4, rc: 0 },
          { club: 'AS Roma (prêt)', from: 2015, to: 2016, apps: 30, goals: 0, ast: 5, yc: 5, rc: 0 },
          { club: 'FC Barcelone', from: 2016, to: 2018, apps: 54, goals: 1, ast: 8, yc: 8, rc: 0 },
          { club: 'Everton', from: 2018, to: 2022, apps: 121, goals: 6, ast: 18, yc: 18, rc: 1 },
          { club: 'Aston Villa', from: 2022, to: null, apps: 98, goals: 2, ast: 14, yc: 12, rc: 0 },
        ] },
      { id: 'fr11', name: 'Maxence LACROIX', pos: 'Défenseur', n: 17, age: 26, born: '06/04/2000', h: '1m90', club: 'Crystal Palace', caps: 4, goals: 0, ast: 0, debut: '06/09/2024', photo: 'images/players/tm_maxence_lacroix.jpg', role: 'Remplaçant', bio: 'Défenseur central de Crystal Palace, nouveau visage des Bleus.',
        career: [
          { club: 'FC Sochaux', from: 2018, to: 2021, apps: 65, goals: 3, ast: 1, yc: 10, rc: 0 },
          { club: 'VfL Wolfsburg', from: 2021, to: 2024, apps: 98, goals: 6, ast: 3, yc: 18, rc: 1 },
          { club: 'Crystal Palace', from: 2024, to: null, apps: 38, goals: 1, ast: 1, yc: 6, rc: 0 },
        ] },
      { id: 'fr14', name: 'Malo GUSTO', pos: 'Défenseur', n: 2, age: 22, born: '19/05/2003', h: '1m79', club: 'Chelsea FC', caps: 8, goals: 0, ast: 2, debut: '22/03/2024', photo: 'images/players/tm_malo_gusto.jpg', role: 'Remplaçant', bio: 'Latéral droit de Chelsea, grande promesse du football français.',
        career: [
          { club: 'Olympique Lyonnais', from: 2021, to: 2023, apps: 55, goals: 2, ast: 5, yc: 7, rc: 0 },
          { club: 'Chelsea FC', from: 2023, to: null, apps: 72, goals: 2, ast: 8, yc: 9, rc: 0 },
        ] },

      // ─── MILIEUX (5) ──────────────────────────────────────────────
      { id: 'fr15', name: 'Aurélien TCHOUAMÉNI', pos: 'Milieu', n: 8, age: 26, born: '27/01/2000', h: '1m87', club: 'Real Madrid', caps: 45, goals: 3, ast: 4, debut: '25/03/2021', photo: 'https://img.sofascore.com/api/v1/player/859025/image', role: 'Titulaire', bio: 'Milieu défensif du Real Madrid, patron du milieu des Bleus.',
        career: [
          { club: 'Girondins Bordeaux', from: 2018, to: 2021, apps: 65, goals: 3, ast: 4, yc: 14, rc: 0 },
          { club: 'AS Monaco', from: 2021, to: 2022, apps: 50, goals: 5, ast: 4, yc: 10, rc: 0 },
          { club: 'Real Madrid', from: 2022, to: null, apps: 105, goals: 6, ast: 8, yc: 18, rc: 1 },
        ] },
      { id: 'fr17', name: 'Adrien RABIOT', pos: 'Milieu', n: 14, age: 31, born: '03/04/1995', h: '1m88', club: 'AC Milan', caps: 57, goals: 6, ast: 7, debut: '10/11/2016', photo: 'images/players/tm_adrien_rabiot.jpg', role: 'Titulaire', bio: 'Milieu complet désormais à l\'AC Milan, expérience et polyvalence.',
        career: [
          { club: 'Paris Saint-Germain', from: 2012, to: 2019, apps: 227, goals: 25, ast: 34, yc: 42, rc: 3 },
          { club: 'Juventus', from: 2019, to: 2024, apps: 155, goals: 18, ast: 16, yc: 32, rc: 1 },
          { club: 'Manchester United', from: 2024, to: 2025, apps: 22, goals: 2, ast: 2, yc: 4, rc: 0 },
          { club: 'AC Milan', from: 2025, to: null, apps: 18, goals: 1, ast: 3, yc: 3, rc: 0 },
        ] },
      { id: 'fr19', name: 'Manu KONÉ', pos: 'Milieu', n: 8, age: 24, born: '17/05/2001', h: '1m85', club: 'AS Roma', caps: 10, goals: 0, ast: 1, debut: '06/09/2024', photo: 'https://img.sofascore.com/api/v1/player/974087/image', role: 'Remplaçant', bio: 'Milieu récupérateur de l\'AS Roma, force et longueur de balle.',
        career: [
          { club: 'Toulouse FC', from: 2019, to: 2021, apps: 32, goals: 1, ast: 2, yc: 6, rc: 0 },
          { club: 'Borussia M\'gladbach', from: 2021, to: 2024, apps: 88, goals: 7, ast: 9, yc: 16, rc: 1 },
          { club: 'AS Roma', from: 2024, to: null, apps: 42, goals: 3, ast: 5, yc: 8, rc: 0 },
        ] },
      { id: 'fr20', name: 'Warren ZAÏRE-EMERY', pos: 'Milieu', n: 18, age: 20, born: '08/03/2006', h: '1m78', club: 'PSG', caps: 12, goals: 1, ast: 1, debut: '07/09/2023', photo: 'https://img.sofascore.com/api/v1/player/1142672/image', role: 'Remplaçant', bio: 'Prodige du PSG, devenu international à 17 ans.',
        career: [
          { club: 'Paris Saint-Germain', from: 2022, to: null, apps: 88, goals: 8, ast: 12, yc: 12, rc: 0 },
        ] },
      { id: 'fr21', name: 'N\'Golo KANTÉ', pos: 'Milieu', n: 13, age: 35, born: '29/03/1991', h: '1m68', club: 'Fenerbahçe', caps: 67, goals: 2, ast: 5, debut: '25/03/2016', photo: 'https://img.sofascore.com/api/v1/player/234148/image', role: 'Titulaire', bio: 'Légende vivante du football français, désormais à Fenerbahçe. Infatigable récupérateur.',
        career: [
          { club: 'SM Caen', from: 2011, to: 2015, apps: 120, goals: 4, ast: 6, yc: 14, rc: 0 },
          { club: 'Leicester City', from: 2015, to: 2016, apps: 37, goals: 1, ast: 3, yc: 4, rc: 0 },
          { club: 'Chelsea FC', from: 2016, to: 2023, apps: 269, goals: 10, ast: 17, yc: 22, rc: 1 },
          { club: 'Al-Ittihad', from: 2023, to: 2025, apps: 42, goals: 1, ast: 4, yc: 5, rc: 0 },
          { club: 'Fenerbahçe', from: 2025, to: null, apps: 22, goals: 0, ast: 3, yc: 3, rc: 0 },
        ] },

      // ─── ATTAQUANTS (9) ───────────────────────────────────────────
      { id: 'fr24', name: 'Kylian MBAPPÉ', pos: 'Attaquant', n: 10, age: 27, born: '20/12/1998', h: '1m78', club: 'Real Madrid', caps: 92, goals: 53, ast: 28, debut: '25/03/2017', photo: 'https://img.sofascore.com/api/v1/player/826643/image', role: 'Titulaire', bio: 'Capitaine et star absolue des Bleus. Meilleur buteur de l\'histoire de l\'équipe de France.',
        career: [
          { club: 'AS Monaco', from: 2015, to: 2017, apps: 60, goals: 27, ast: 14, yc: 5, rc: 0 },
          { club: 'PSG (prêt)', from: 2017, to: 2018, apps: 44, goals: 21, ast: 16, yc: 3, rc: 0 },
          { club: 'Paris Saint-Germain', from: 2018, to: 2024, apps: 266, goals: 224, ast: 108, yc: 22, rc: 0 },
          { club: 'Real Madrid', from: 2024, to: null, apps: 58, goals: 30, ast: 12, yc: 6, rc: 0 },
        ] },
      { id: 'fr25', name: 'Ousmane DEMBÉLÉ', pos: 'Attaquant', n: 7, age: 28, born: '15/05/1997', h: '1m78', club: 'PSG', caps: 60, goals: 9, ast: 16, debut: '15/11/2016', photo: 'https://img.sofascore.com/api/v1/player/818244/image', role: 'Titulaire', bio: 'Ailier virevoltant du PSG, dribbleur d\'élite.',
        career: [
          { club: 'Stade Rennais', from: 2014, to: 2016, apps: 26, goals: 12, ast: 4, yc: 4, rc: 0 },
          { club: 'Borussia Dortmund', from: 2016, to: 2017, apps: 32, goals: 10, ast: 12, yc: 3, rc: 0 },
          { club: 'FC Barcelone', from: 2017, to: 2023, apps: 185, goals: 32, ast: 38, yc: 22, rc: 1 },
          { club: 'Paris Saint-Germain', from: 2023, to: null, apps: 88, goals: 28, ast: 32, yc: 10, rc: 0 },
        ] },
      { id: 'fr26', name: 'Michael OLISE', pos: 'Attaquant', n: 11, age: 24, born: '12/12/2001', h: '1m84', club: 'Bayern Munich', caps: 14, goals: 4, ast: 5, debut: '22/03/2024', photo: 'images/players/tm_michael_olise.jpg', role: 'Titulaire', bio: 'Ailier élégant du Bayern Munich, technique et finition.',
        career: [
          { club: 'Reading', from: 2020, to: 2021, apps: 43, goals: 11, ast: 10, yc: 5, rc: 0 },
          { club: 'Crystal Palace', from: 2021, to: 2024, apps: 77, goals: 19, ast: 22, yc: 6, rc: 0 },
          { club: 'Bayern Munich', from: 2024, to: null, apps: 48, goals: 18, ast: 16, yc: 4, rc: 0 },
        ] },
      { id: 'fr27', name: 'Bradley BARCOLA', pos: 'Attaquant', n: 20, age: 23, born: '02/09/2002', h: '1m82', club: 'PSG', caps: 16, goals: 4, ast: 4, debut: '07/09/2023', photo: 'images/players/tm_bradley_barcola.jpg', role: 'Remplaçant', bio: 'Ailier gauche explosif du PSG.',
        career: [
          { club: 'Olympique Lyonnais', from: 2021, to: 2023, apps: 58, goals: 12, ast: 8, yc: 6, rc: 0 },
          { club: 'Paris Saint-Germain', from: 2023, to: null, apps: 88, goals: 32, ast: 22, yc: 8, rc: 0 },
        ] },
      { id: 'fr28', name: 'Marcus THURAM', pos: 'Attaquant', n: 9, age: 28, born: '06/08/1997', h: '1m92', club: 'Inter Milan', caps: 32, goals: 9, ast: 6, debut: '08/10/2020', photo: 'images/players/tm_marcus_thuram.jpg', role: 'Remplaçant', bio: 'Avant-centre puissant de l\'Inter Milan, fils de Lilian Thuram.',
        career: [
          { club: 'EA Guingamp', from: 2017, to: 2019, apps: 52, goals: 12, ast: 6, yc: 8, rc: 0 },
          { club: 'Borussia M\'gladbach', from: 2019, to: 2023, apps: 143, goals: 46, ast: 28, yc: 18, rc: 1 },
          { club: 'Inter Milan', from: 2023, to: null, apps: 88, goals: 38, ast: 18, yc: 12, rc: 0 },
        ] },
      { id: 'fr31', name: 'Jean-Philippe MATETA', pos: 'Attaquant', n: 19, age: 28, born: '28/06/1997', h: '1m92', club: 'Crystal Palace', caps: 10, goals: 3, ast: 1, debut: '06/09/2024', photo: 'https://img.sofascore.com/api/v1/player/848276/image', role: 'Remplaçant', bio: 'Avant-centre physique de Crystal Palace, médaillé d\'argent JO 2024.',
        career: [
          { club: 'Olympique Lyonnais', from: 2015, to: 2018, apps: 42, goals: 12, ast: 3, yc: 5, rc: 0 },
          { club: 'Mainz 05', from: 2018, to: 2021, apps: 75, goals: 22, ast: 8, yc: 12, rc: 1 },
          { club: 'Crystal Palace (prêt)', from: 2021, to: 2022, apps: 22, goals: 5, ast: 2, yc: 2, rc: 0 },
          { club: 'Crystal Palace', from: 2022, to: null, apps: 112, goals: 44, ast: 16, yc: 14, rc: 0 },
        ] },
      { id: 'fr22', name: 'Rayan CHERKI', pos: 'Attaquant', n: 22, age: 22, born: '17/08/2003', h: '1m76', club: 'Manchester City', caps: 6, goals: 0, ast: 1, debut: '09/06/2025', photo: 'images/players/tm_rayan_cherki.jpg', role: 'Remplaçant', bio: 'Ailier technique de Manchester City, créativité et dribble hors-norme.',
        career: [
          { club: 'Olympique Lyonnais', from: 2020, to: 2025, apps: 122, goals: 28, ast: 32, yc: 12, rc: 0 },
          { club: 'Manchester City', from: 2025, to: null, apps: 18, goals: 4, ast: 6, yc: 2, rc: 0 },
        ] },
      { id: 'fr23', name: 'Maghnes AKLIOUCHE', pos: 'Attaquant', n: 23, age: 24, born: '25/02/2002', h: '1m85', club: 'AS Monaco', caps: 7, goals: 1, ast: 1, debut: '07/09/2024', photo: 'images/players/tm_maghnes_akliouche.jpg', role: 'Remplaçant', bio: 'Ailier de Monaco, technique fine et sens du but.',
        career: [
          { club: 'AS Monaco', from: 2021, to: null, apps: 102, goals: 18, ast: 22, yc: 10, rc: 0 },
        ] },
      { id: 'fr32', name: 'Désiré DOUÉ', pos: 'Attaquant', n: 20, age: 20, born: '03/06/2005', h: '1m81', club: 'PSG', caps: 6, goals: 2, ast: 0, debut: '14/11/2024', photo: 'https://img.sofascore.com/api/v1/player/1154605/image', role: 'Remplaçant', bio: 'Attaquant pétillant du PSG, héros de la finale C1 2025.',
        career: [
          { club: 'Stade Rennais', from: 2022, to: 2024, apps: 55, goals: 10, ast: 8, yc: 6, rc: 0 },
          { club: 'Paris Saint-Germain', from: 2024, to: null, apps: 48, goals: 14, ast: 10, yc: 4, rc: 0 },
        ] },
    ]
  },
  'Espagne': { flag: '🇪🇸',
    coach: 'Luis de la Fuente', formation: '4-3-3', confederation: 'UEFA', titles: 1,
    players: [
      { id: 'es1', name: 'Unai SIMÓN', pos: 'Gardien', n: 1, age: 27, born: '11/06/1997', h: '1m90', club: 'Athletic Bilbao', caps: 32, goals: 0, ast: 0, debut: '08/09/2020', photo: 'images/players/ss_unai_simon.jpg', role: 'Titulaire', bio: 'Gardien titulaire de la Roja depuis 2020.' },
      { id: 'es2', name: 'Dani CARVAJAL', pos: 'Défenseur', n: 2, age: 32, born: '11/01/1992', h: '1m73', club: 'Real Madrid', caps: 82, goals: 4, ast: 12, debut: '15/11/2013', photo: 'images/players/ss_dani_carvajal.jpg', role: 'Titulaire', bio: "Latéral droit du Real Madrid, Champion d'Europe 2024." },
      { id: 'es3', name: 'Aymeric LAPORTE', pos: 'Défenseur', n: 14, age: 32, born: '27/05/1994', h: '1m89', club: 'Al-Nassr', caps: 38, goals: 3, ast: 2, debut: '27/05/2021', photo: 'images/players/ss_aymeric_laporte.jpg', role: 'Titulaire', bio: 'Défenseur central solide, pilier de la défense espagnole.' },
      { id: 'es4', name: 'Robin LE NORMAND', pos: 'Défenseur', n: 24, age: 27, born: '11/11/1996', h: '1m87', club: 'Atlético Madrid', caps: 12, goals: 1, ast: 0, debut: '07/09/2023', photo: 'images/players/ss_robin_le_normand.jpg', role: 'Titulaire', bio: "Défenseur central de l'Atlético Madrid, révélation de la sélection espagnole." },
      { id: 'es5', name: 'Marc CUCURELLA', pos: 'Défenseur', n: 3, age: 25, born: '22/07/1998', h: '1m72', club: 'Chelsea FC', caps: 28, goals: 1, ast: 3, debut: '08/09/2021', photo: 'images/players/ss_marc_cucurella.jpg', role: 'Titulaire', bio: 'Latéral gauche de Chelsea, titulaire indiscutable de la Roja.' },
      { id: 'es6', name: 'RODRI', pos: 'Milieu', n: 16, age: 28, born: '22/06/1996', h: '1m91', club: 'Man. City', caps: 62, goals: 5, ast: 16, debut: '18/11/2019', photo: 'images/players/ss_rodri.jpg', role: 'Titulaire', bio: "Ballon d'Or 2024. Le meilleur milieu défensif du monde." },
      { id: 'es7', name: 'Fabián RUIZ', pos: 'Milieu', n: 8, age: 28, born: '03/08/1996', h: '1m89', club: 'PSG', caps: 38, goals: 5, ast: 8, debut: '11/10/2018', photo: 'images/players/942167.webp', role: 'Titulaire', bio: 'Milieu créatif du PSG, parmi les plus techniques de la sélection espagnole.' },
      { id: 'es8', name: 'PEDRI', pos: 'Milieu', n: 26, age: 22, born: '25/11/2002', h: '1m74', club: 'FC Barcelone', caps: 38, goals: 4, ast: 9, debut: '08/09/2021', photo: 'images/players/ss_pedri.jpg', role: 'Titulaire', bio: 'Prodige du FC Barcelone, vision du jeu exceptionnelle.' },
      { id: 'es9', name: 'Lamine YAMAL', pos: 'Attaquant', n: 19, age: 18, born: '13/07/2007', h: '1m76', club: 'FC Barcelone', caps: 22, goals: 7, ast: 11, debut: '05/09/2023', photo: 'images/players/ss_lamine_yamal.jpg', role: 'Titulaire', bio: "Phénomène du FC Barcelone. Champion d'Europe 2024 à 16 ans." },
      { id: 'es10', name: 'Nico WILLIAMS', pos: 'Attaquant', n: 17, age: 22, born: '12/07/2002', h: '1m80', club: 'Athletic Bilbao', caps: 24, goals: 6, ast: 8, debut: '25/03/2023', photo: 'https://img.sofascore.com/api/v1/player/783374/image', role: 'Titulaire', bio: "Ailier gauche de l'Athletic Bilbao, révélation de l'Euro 2024." },
      { id: 'es11', name: 'Álvaro MORATA', pos: 'Attaquant', n: 7, age: 33, born: '23/10/1992', h: '1m87', club: 'AC Milan', caps: 78, goals: 35, ast: 18, debut: '15/11/2014', photo: 'images/players/ss_alvaro_morata.jpg', role: 'Titulaire', bio: "Capitaine de la Roja, buteur expérimenté." },
      { id: 'es12', name: 'Dani OLMO', pos: 'Attaquant', n: 10, age: 26, born: '07/05/1998', h: '1m79', club: 'FC Barcelone', caps: 42, goals: 12, ast: 14, debut: '15/11/2019', photo: 'images/players/ss_dani_olmo.jpg', role: 'Remplaçant', bio: 'Milieu offensif du FC Barcelone, créatif et décisif.' },
      { id: 'es13', name: 'David RAYA', pos: 'Gardien', n: 13, age: 30, club: 'Arsenal', photo: 'images/players/ss_david_raya.jpg', role: 'Remplaçant', bio: 'Gardien d\'Arsenal, très performant en Premier League.' },
      { id: 'es14', name: 'Pau CUBARSÍ', pos: 'Défenseur', n: 5, age: 19, club: 'FC Barcelone', photo: 'images/players/1402913.webp', role: 'Remplaçant', bio: 'Jeune talent du Barça en défense.' },
      { id: 'es15', name: 'GAVI', pos: 'Milieu', n: 6, age: 20, club: 'FC Barcelone', photo: 'images/players/1103693.webp', role: 'Remplaçant', bio: 'Le guerrier du milieu de terrain, futur pilier de la Roja.' }
    ]
  },
  'Argentine': { flag: '🇦🇷',
    coach: 'Lionel Scaloni', formation: '4-3-3', confederation: 'CONMEBOL', titles: 0,
    players: [
{ id: 'ar1', name: 'Emiliano MARTÍNEZ', pos: 'Gardien', n: 23, age: 31, born: '02/09/1992', h: '1m95', club: 'Aston Villa', caps: 42, goals: 0, ast: 0, debut: '03/06/2021', photo: 'images/players/ss_emiliano_martinez.jpg', role: 'Titulaire', bio: 'Meilleur gardien du Monde 2022. Héros de la Coupe du Monde.' },
      { id: 'ar2', name: 'Nahuel MOLINA', pos: 'Défenseur', n: 26, age: 26, born: '06/04/1998', h: '1m75', club: 'Atlético Madrid', caps: 38, goals: 4, ast: 6, debut: '03/06/2021', photo: 'images/players/ss_nahuel_molina.jpg', role: 'Titulaire', bio: 'Latéral droit de l\'Atlético Madrid.' },
      { id: 'ar3', name: 'Cristian ROMERO', pos: 'Défenseur', n: 13, age: 26, born: '27/04/1998', h: '1m85', club: 'Tottenham', caps: 38, goals: 3, ast: 2, debut: '03/06/2021', photo: 'images/players/829932.webp', role: 'Titulaire', bio: 'Défenseur central de Tottenham, agressif et redoutable.' },
      { id: 'ar4', name: 'Lisandro MARTÍNEZ', pos: 'Défenseur', n: 25, age: 26, born: '18/01/1998', h: '1m80', club: 'Man. United', caps: 32, goals: 2, ast: 1, debut: '03/06/2021', photo: 'images/players/ss_lisandro_martinez.jpg', role: 'Titulaire', bio: 'Défenseur central de Manchester United.' },
      { id: 'ar5', name: 'Nicolás TAGLIAFICO', pos: 'Défenseur', n: 3, age: 31, born: '31/08/1992', h: '1m72', club: 'Lyon', caps: 68, goals: 4, ast: 8, debut: '10/11/2017', photo: 'images/players/ss_nicolas_tagliafico.jpg', role: 'Titulaire', bio: 'Latéral gauche de Lyon, pilier de la défense argentine.' },
      { id: 'ar6', name: 'Rodrigo DE PAUL', pos: 'Milieu', n: 7, age: 30, born: '24/05/1994', h: '1m80', club: 'Atlético Madrid', caps: 72, goals: 8, ast: 18, debut: '11/11/2018', photo: 'images/players/249399.webp', role: 'Titulaire', bio: 'Milieu de l\'Atlético Madrid, moteur de l\'Argentine.' },
      { id: 'ar7', name: 'Enzo FERNÁNDEZ', pos: 'Milieu', n: 24, age: 23, born: '17/01/2001', h: '1m78', club: 'Chelsea FC', caps: 38, goals: 4, ast: 8, debut: '26/09/2022', photo: 'images/players/ss_enzo_fernandez.jpg', role: 'Titulaire', bio: 'Meilleur jeune joueur de la Coupe du Monde 2022.' },
      { id: 'ar8', name: 'Alexis MAC ALLISTER', pos: 'Milieu', n: 20, age: 25, born: '24/12/1998', h: '1m74', club: 'Liverpool FC', caps: 42, goals: 8, ast: 10, debut: '03/06/2021', photo: 'images/players/ss_alexis_mac_allister.jpg', role: 'Titulaire', bio: 'Milieu de Liverpool, parmi les plus complets de sa génération.' },
      { id: 'ar9', name: 'Lionel MESSI', pos: 'Attaquant', n: 10, age: 37, born: '24/06/1987', h: '1m70', club: 'Inter Miami', caps: 191, goals: 109, ast: 58, debut: '17/08/2005', photo: 'images/players/ss_lionel_messi.jpg', role: 'Titulaire', bio: 'Le GOAT. 8 Ballons d\'Or, Champion du Monde 2022. 109 buts en 191 sélections.' },
      { id: 'ar10', name: 'Julián ÁLVAREZ', pos: 'Attaquant', n: 9, age: 24, born: '31/01/2000', h: '1m70', club: 'Atlético Madrid', caps: 42, goals: 22, ast: 12, debut: '03/06/2021', photo: 'images/players/ss_julian_alvarez.jpg', role: 'Titulaire', bio: 'Attaquant de l\'Atlético Madrid, héros de la Coupe du Monde 2022.' },
      { id: 'ar11', name: 'Ángel DI MARÍA', pos: 'Attaquant', n: 11, age: 36, born: '14/02/1988', h: '1m80', club: 'Benfica', caps: 145, goals: 31, ast: 46, debut: '06/09/2008', photo: 'images/players/ss_angel_di_maria.jpg', role: 'Titulaire', bio: 'Légende de l\'Argentine, 145 sélections. But décisif en finale du Mondial 2022.' },
      { id: 'ar12', name: 'Franco ARMANI', pos: 'Gardien', n: 12, age: 37, born: '16/10/1986', h: '1m89', club: 'River Plate', caps: 12, goals: 0, ast: 0, debut: '23/03/2018', photo: 'images/players/ss_franco_armani.jpg', role: 'Remplaçant', bio: 'Gardien de River Plate, expérimenté.' },
      { id: 'ar13', name: 'Germán PEZZELLA', pos: 'Défenseur', n: 6, age: 32, born: '27/06/1991', h: '1m87', club: 'Real Betis', caps: 32, goals: 2, ast: 0, debut: '11/11/2016', photo: 'images/players/ss_german_pezzella.jpg', role: 'Remplaçant', bio: 'Défenseur central de Real Betis.' },
      { id: 'ar14', name: 'Nicolás OTAMENDI', pos: 'Défenseur', n: 19, age: 36, born: '12/02/1988', h: '1m83', club: 'Benfica', caps: 112, goals: 6, ast: 2, debut: '11/11/2009', photo: 'images/players/74915.webp', role: 'Remplaçant', bio: 'Défenseur central de Benfica, 112 sélections.' },
      { id: 'ar15', name: 'Leandro PAREDES', pos: 'Milieu', n: 5, age: 30, born: '29/06/1994', h: '1m80', club: 'Roma', caps: 62, goals: 4, ast: 8, debut: '11/11/2016', photo: 'images/players/255389.webp', role: 'Remplaçant', bio: 'Milieu de la Roma.' },
      { id: 'ar16', name: 'Giovani LO CELSO', pos: 'Milieu', n: 18, age: 28, born: '09/04/1996', h: '1m77', club: 'Villarreal', caps: 52, goals: 6, ast: 10, debut: '11/11/2016', photo: 'images/players/ss_giovani_lo_celso.jpg', role: 'Remplaçant', bio: 'Milieu offensif de Villarreal.' },
      { id: 'ar17', name: 'Nicolás GONZÁLEZ', pos: 'Attaquant', n: 22, age: 26, born: '06/04/1998', h: '1m80', club: 'Juventus', caps: 22, goals: 6, ast: 4, debut: '11/11/2021', photo: 'images/players/901325.webp', role: 'Remplaçant', bio: 'Ailier de la Juventus.' },
      { id: 'ar18', name: 'Lautaro MARTÍNEZ', pos: 'Attaquant', n: 22, age: 26, born: '22/08/1997', h: '1m74', club: 'Inter Milan', caps: 62, goals: 28, ast: 12, debut: '23/03/2018', photo: 'images/players/ss_lautaro_martinez.jpg', role: 'Remplaçant', bio: 'Attaquant de l\'Inter Milan, buteur prolifique.' },
      { id: 'ger23', name: 'Gerónimo RULLI', pos: 'Gardien', n: 12, age: 32, born: '01/01/1992', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/128383.webp', role: 'Titulaire', bio: 'Gardien de l\'équipe Argentine.' },
      { id: 'jua24', name: 'Juan FOYTH', pos: 'Défenseur', n: 2, age: 26, born: '01/01/1998', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/ss_juan_foyth.jpg', role: 'Titulaire', bio: 'Défenseur de l\'équipe Argentine.' },
      { id: 'exe25', name: 'Exequiel PALACIOS', pos: 'Milieu', n: 14, age: 25, born: '01/01/1999', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/ss_exequiel_palacios.jpg', role: 'Titulaire', bio: 'Milieu de l\'équipe Argentine.' },
      { id: 'áng26', name: 'Ángel CORREA', pos: 'Attaquant', n: 15, age: 29, born: '01/01/1995', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/316152.webp', role: 'Titulaire', bio: 'Attaquant de l\'équipe Argentine.' },
      { id: 'thi27', name: 'Thiago ALMADA', pos: 'Milieu', n: 16, age: 23, born: '01/01/2001', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/ss_thiago_almada.jpg', role: 'Titulaire', bio: 'Milieu de l\'équipe Argentine.' }
    ]
  },
  'Brésil': { flag: '🇧🇷',
    coach: 'Dorival Júnior', formation: '4-2-3-1', confederation: 'CONMEBOL', titles: 0,
    players: [
{ id: 'br1', name: 'Alisson BECKER', pos: 'Gardien', n: 1, age: 31, born: '02/10/1992', h: '1m93', club: 'Liverpool FC', caps: 72, goals: 1, ast: 0, debut: '13/11/2015', photo: 'images/players/tsdb_alisson_becker.jpg', role: 'Titulaire', bio: 'Meilleur gardien du monde, patron des cages brésiliennes depuis 2018.' },
      { id: 'br2', name: 'Danilo', pos: 'Défenseur', n: 2, age: 33, born: '15/07/1991', h: '1m84', club: 'Flamengo', caps: 88, goals: 5, ast: 10, debut: '14/11/2011', photo: 'images/players/124992.webp', role: 'Titulaire', bio: 'Capitaine du Brésil, latéral droit expérimenté.' },
      { id: 'br3', name: 'Marquinhos', pos: 'Défenseur', n: 4, age: 30, born: '14/05/1994', h: '1m83', club: 'PSG', caps: 88, goals: 8, ast: 4, debut: '14/08/2013', photo: 'images/players/155995.webp', role: 'Titulaire', bio: 'Défenseur central du PSG, l\'un des meilleurs du monde.' },
      { id: 'br4', name: 'Gabriel MAGALHÃES', pos: 'Défenseur', n: 3, age: 26, born: '19/12/1997', h: '1m90', club: 'Arsenal FC', caps: 22, goals: 2, ast: 1, debut: '09/10/2021', photo: 'images/players/869792.webp', role: 'Titulaire', bio: 'Défenseur central d\'Arsenal.' },
      { id: 'br5', name: 'Guilherme ARANA', pos: 'Défenseur', n: 6, age: 27, born: '14/04/1997', h: '1m78', club: 'Atlético MG', caps: 18, goals: 1, ast: 3, debut: '07/09/2021', photo: 'images/players/tsdb_guilherme_arana.jpg', role: 'Titulaire', bio: 'Latéral gauche d\'Atlético Mineiro.' },
      { id: 'br6', name: 'Casemiro', pos: 'Milieu', n: 5, age: 32, born: '23/02/1992', h: '1m85', club: 'Man. United', caps: 88, goals: 8, ast: 6, debut: '14/11/2011', photo: 'images/players/tsdb_casemiro.jpg', role: 'Titulaire', bio: 'Milieu défensif de Manchester United.' },
      { id: 'br7', name: 'Bruno GUIMARÃES', pos: 'Milieu', n: 8, age: 26, born: '16/11/1997', h: '1m82', club: 'Newcastle', caps: 32, goals: 4, ast: 6, debut: '07/09/2021', photo: 'images/players/866469.webp', role: 'Titulaire', bio: 'Milieu de Newcastle, parmi les meilleurs de Premier League.' },
      { id: 'br8', name: 'Lucas PAQUETÁ', pos: 'Milieu', n: 10, age: 26, born: '27/08/1997', h: '1m80', club: 'West Ham', caps: 52, goals: 8, ast: 12, debut: '16/10/2018', photo: 'images/players/839981.webp', role: 'Titulaire', bio: 'Milieu offensif de West Ham, créatif et technique.' },
      { id: 'br9', name: 'Vinícius JÚNIOR', pos: 'Attaquant', n: 7, age: 23, born: '12/07/2000', h: '1m76', club: 'Real Madrid', caps: 42, goals: 12, ast: 10, debut: '20/11/2019', photo: 'images/players/tsdb_vinicius_junior.jpg', role: 'Titulaire', bio: 'Ailier du Real Madrid, l\'un des meilleurs joueurs du monde.' },
      { id: 'br10', name: 'Rodrygo', pos: 'Attaquant', n: 11, age: 23, born: '09/01/2001', h: '1m74', club: 'Real Madrid', caps: 32, goals: 8, ast: 6, debut: '09/10/2021', photo: 'images/players/tsdb_rodrygo.jpg', role: 'Titulaire', bio: 'Ailier du Real Madrid, décisif dans les grands matchs.' },
      { id: 'br11', name: 'Endrick', pos: 'Attaquant', n: 9, age: 18, born: '21/07/2006', h: '1m74', club: 'Real Madrid', caps: 12, goals: 4, ast: 2, debut: '12/10/2023', photo: 'images/players/1174937.webp', role: 'Titulaire', bio: 'Prodige brésilien du Real Madrid, grande promesse du football mondial.' },
      { id: 'br12', name: 'Ederson', pos: 'Gardien', n: 23, age: 30, born: '17/08/1993', h: '1m88', club: 'Man. City', caps: 32, goals: 0, ast: 0, debut: '10/11/2017', photo: 'images/players/254491.webp', role: 'Remplaçant', bio: 'Gardien de Man. City.' },
      { id: 'br13', name: 'Éder MILITÃO', pos: 'Défenseur', n: 14, age: 26, born: '18/01/1998', h: '1m86', club: 'Real Madrid', caps: 32, goals: 2, ast: 1, debut: '22/03/2019', photo: 'images/players/tsdb_eder_militao.jpg', role: 'Remplaçant', bio: 'Défenseur central du Real Madrid.' },
      { id: 'br14', name: 'Alex TELLES', pos: 'Défenseur', n: 6, age: 31, born: '15/12/1992', h: '1m81', club: 'Besiktas', caps: 22, goals: 2, ast: 4, debut: '07/09/2019', photo: 'images/players/tsdb_alex_telles.jpg', role: 'Remplaçant', bio: 'Latéral gauche de Besiktas.' },
      { id: 'br15', name: 'Gerson', pos: 'Milieu', n: 18, age: 27, born: '20/05/1997', h: '1m83', club: 'OM', caps: 18, goals: 2, ast: 3, debut: '07/09/2021', photo: 'images/players/tsdb_gerson.jpg', role: 'Remplaçant', bio: 'Milieu de l\'OM.' },
      { id: 'br16', name: 'Gabriel MARTINELLI', pos: 'Attaquant', n: 11, age: 22, born: '18/06/2001', h: '1m75', club: 'Arsenal FC', caps: 18, goals: 4, ast: 4, debut: '07/09/2021', photo: 'images/players/922573.webp', role: 'Remplaçant', bio: 'Ailier d\'Arsenal.' },
      { id: 'br17', name: 'Gabriel JESUS', pos: 'Attaquant', n: 9, age: 27, born: '03/04/1997', h: '1m75', club: 'Arsenal FC', caps: 62, goals: 19, ast: 14, debut: '13/11/2015', photo: 'images/players/tsdb_gabriel_jesus.jpg', role: 'Remplaçant', bio: 'Attaquant d\'Arsenal.' },
      { id: 'br18', name: 'Richarlison', pos: 'Attaquant', n: 7, age: 27, born: '10/05/1997', h: '1m84', club: 'Tottenham', caps: 52, goals: 22, ast: 8, debut: '07/09/2018', photo: 'images/players/840217.webp', role: 'Remplaçant', bio: 'Attaquant de Tottenham.' },
      { id: 'ede23', name: 'Ederson', pos: 'Gardien', n: 23, age: 30, born: '01/01/1994', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/254491.webp', role: 'Titulaire', bio: 'Gardien de l\'équipe Brésil.' },
      { id: 'bre24', name: 'Bremer', pos: 'Défenseur', n: 24, age: 27, born: '01/01/1997', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_bremer.jpg', role: 'Titulaire', bio: 'Défenseur de l\'équipe Brésil.' },
      { id: 'fab25', name: 'Fabinho', pos: 'Milieu', n: 15, age: 30, born: '01/01/1994', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/243585.webp', role: 'Titulaire', bio: 'Milieu de l\'équipe Brésil.' },
      { id: 'ant26', name: 'Antony', pos: 'Attaquant', n: 19, age: 24, born: '01/01/2000', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_antony.jpg', role: 'Titulaire', bio: 'Attaquant de l\'équipe Brésil.' },
      { id: 'mar27', name: 'Martinelli', pos: 'Attaquant', n: 26, age: 23, born: '01/01/2001', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/922573.webp', role: 'Titulaire', bio: 'Attaquant de l\'équipe Brésil.' }
    ]
  },
  'Portugal': { flag: '🇵🇹',
    coach: 'Roberto Martínez', formation: '4-3-3', confederation: 'UEFA', titles: 0,
    players: [
{ id: 'pt1', name: 'Diogo COSTA', pos: 'Gardien', n: 1, age: 24, born: '19/09/2000', h: '1m87', club: 'FC Porto', caps: 22, goals: 0, ast: 0, debut: '04/09/2021', photo: 'images/players/843115.webp', role: 'Titulaire', bio: 'Gardien titulaire du Portugal, héros des tirs au but à l\'Euro 2024.' },
      { id: 'pt2', name: 'João CANCELO', pos: 'Défenseur', n: 20, age: 30, born: '27/05/1994', h: '1m82', club: 'FC Barcelone', caps: 62, goals: 3, ast: 12, debut: '07/10/2016', photo: 'images/players/138892.webp', role: 'Titulaire', bio: 'Latéral polyvalent du FC Barcelone.' },
      { id: 'pt3', name: 'Rúben DIAS', pos: 'Défenseur', n: 4, age: 27, born: '14/05/1997', h: '1m87', club: 'Man. City', caps: 62, goals: 4, ast: 2, debut: '07/09/2018', photo: 'images/players/tsdb_ruben_dias.jpg', role: 'Titulaire', bio: 'Défenseur central de Man. City, l\'un des meilleurs du monde.' },
      { id: 'pt4', name: 'Pepe', pos: 'Défenseur', n: 3, age: 41, born: '26/02/1983', h: '1m88', club: 'FC Porto', caps: 142, goals: 8, ast: 4, debut: '17/08/2007', photo: 'images/players/tsdb_pepe.jpg', role: 'Titulaire', bio: 'Légende du Portugal, 142 sélections. Toujours présent à 41 ans.' },
      { id: 'pt5', name: 'Nuno MENDES', pos: 'Défenseur', n: 22, age: 22, born: '19/06/2002', h: '1m80', club: 'PSG', caps: 28, goals: 1, ast: 4, debut: '04/09/2021', photo: 'images/players/989768.webp', role: 'Titulaire', bio: 'Latéral gauche du PSG, grande promesse du football portugais.' },
      { id: 'pt6', name: 'Vitinha', pos: 'Milieu', n: 8, age: 24, born: '13/02/2000', h: '1m72', club: 'PSG', caps: 32, goals: 3, ast: 8, debut: '04/09/2021', photo: 'images/players/902029.webp', role: 'Titulaire', bio: 'Milieu technique du PSG.' },
      { id: 'pt7', name: 'Rúben NEVES', pos: 'Milieu', n: 15, age: 27, born: '13/03/1997', h: '1m82', club: 'Al-Hilal', caps: 62, goals: 8, ast: 6, debut: '31/08/2017', photo: 'images/players/280955.webp', role: 'Titulaire', bio: 'Milieu box-to-box, pilier du Portugal.' },
      { id: 'pt8', name: 'Bruno FERNANDES', pos: 'Milieu', n: 8, age: 29, born: '08/09/1994', h: '1m79', club: 'Man. United', caps: 72, goals: 18, ast: 22, debut: '07/09/2017', photo: 'images/players/tsdb_bruno_fernandes.jpg', role: 'Titulaire', bio: 'Capitaine du Portugal, meneur de jeu de Manchester United.' },
      { id: 'pt9', name: 'Cristiano RONALDO', pos: 'Attaquant', n: 7, age: 39, born: '05/02/1985', h: '1m87', club: 'Al-Nassr', caps: 212, goals: 130, ast: 42, debut: '20/08/2003', photo: 'images/players/tsdb_cristiano_ronaldo.jpg', role: 'Titulaire', bio: 'CR7. Meilleur buteur de l\'histoire du football international avec 130 buts en 212 sélections.' },
      { id: 'pt10', name: 'Rafael LEÃO', pos: 'Attaquant', n: 17, age: 25, born: '10/06/1999', h: '1m88', club: 'AC Milan', caps: 32, goals: 8, ast: 10, debut: '14/11/2019', photo: 'images/players/tsdb_rafael_leao.jpg', role: 'Titulaire', bio: 'Ailier gauche de l\'AC Milan, vitesse et technique redoutables.' },
      { id: 'pt11', name: 'João FÉLIX', pos: 'Attaquant', n: 11, age: 24, born: '10/11/1999', h: '1m81', club: 'FC Barcelone', caps: 42, goals: 12, ast: 8, debut: '05/09/2019', photo: 'images/players/tsdb_joao_felix.jpg', role: 'Titulaire', bio: 'Attaquant du FC Barcelone, talent immense.' },
      { id: 'pt12', name: 'José SÁ', pos: 'Gardien', n: 13, age: 31, born: '17/01/1993', h: '1m90', club: 'Wolves', caps: 8, goals: 0, ast: 0, debut: '25/03/2022', photo: 'images/players/tsdb_jose_sa.jpg', role: 'Remplaçant', bio: 'Gardien des Wolves.' },
      { id: 'pt13', name: 'Diogo DALOT', pos: 'Défenseur', n: 2, age: 25, born: '18/03/1999', h: '1m83', club: 'Man. United', caps: 28, goals: 1, ast: 4, debut: '07/09/2021', photo: 'images/players/tsdb_diogo_dalot.jpg', role: 'Remplaçant', bio: 'Latéral droit de Manchester United.' },
      { id: 'pt14', name: 'António SILVA', pos: 'Défenseur', n: 6, age: 21, born: '30/04/2003', h: '1m87', club: 'Benfica', caps: 12, goals: 1, ast: 0, debut: '25/03/2023', photo: 'images/players/1006069.webp', role: 'Remplaçant', bio: 'Défenseur central de Benfica.' },
      { id: 'pt15', name: 'Bernardo SILVA', pos: 'Milieu', n: 10, age: 29, born: '10/08/1994', h: '1m73', club: 'Man. City', caps: 82, goals: 14, ast: 22, debut: '07/10/2015', photo: 'images/players/tsdb_bernardo_silva.jpg', role: 'Remplaçant', bio: 'Milieu de Man. City, technique et créatif.' },
      { id: 'pt16', name: 'Gonçalo RAMOS', pos: 'Attaquant', n: 9, age: 23, born: '20/06/2001', h: '1m87', club: 'PSG', caps: 18, goals: 8, ast: 4, debut: '25/03/2022', photo: 'images/players/934510.webp', role: 'Remplaçant', bio: 'Attaquant du PSG, hat-trick au Mondial 2022.' },
      { id: 'pt17', name: 'Pedro NETO', pos: 'Attaquant', n: 7, age: 24, born: '09/03/2000', h: '1m73', club: 'Chelsea FC', caps: 22, goals: 4, ast: 6, debut: '07/09/2021', photo: 'images/players/tsdb_pedro_neto.jpg', role: 'Remplaçant', bio: 'Ailier de Chelsea.' },
      { id: 'rui23', name: 'Rui PATRÍCIO', pos: 'Gardien', n: 1, age: 36, born: '01/01/1988', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_rui_patricio.jpg', role: 'Titulaire', bio: 'Gardien de l\'équipe Portugal.' },
      { id: 'rap24', name: 'Raphaël GUERREIRO', pos: 'Défenseur', n: 5, age: 30, born: '01/01/1994', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_raphael_guerreiro.jpg', role: 'Titulaire', bio: 'Défenseur de l\'équipe Portugal.' },
      { id: 'joã25', name: 'João PALHINHA', pos: 'Milieu', n: 6, age: 28, born: '01/01/1996', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_joao_palhinha.jpg', role: 'Titulaire', bio: 'Milieu de l\'équipe Portugal.' },
      { id: 'otá26', name: 'Otávio', pos: 'Milieu', n: 16, age: 29, born: '01/01/1995', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/244801.webp', role: 'Titulaire', bio: 'Milieu de l\'équipe Portugal.' },
      { id: 'ric27', name: 'Ricardo HORTA', pos: 'Attaquant', n: 21, age: 29, born: '01/01/1995', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/314380.webp', role: 'Titulaire', bio: 'Attaquant de l\'équipe Portugal.' },
      { id: 'joã28', name: 'João MÁRIO', pos: 'Milieu', n: 17, age: 31, born: '01/01/1993', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/902031.webp', role: 'Titulaire', bio: 'Milieu de l\'équipe Portugal.' }
    ]
  },
  'Angleterre': { flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    coach: 'Gareth Southgate', formation: '4-3-3', confederation: 'UEFA', titles: 0,
    players: [
{ id: 'en1', name: 'Jordan PICKFORD', pos: 'Gardien', n: 1, age: 30, born: '07/03/1994', h: '1m85', club: 'Everton', caps: 62, goals: 0, ast: 0, debut: '10/11/2017', photo: 'images/players/tsdb_jordan_pickford.jpg', role: 'Titulaire', bio: 'Gardien titulaire des Three Lions depuis 2018.' },
      { id: 'en2', name: 'Kyle WALKER', pos: 'Défenseur', n: 2, age: 33, born: '28/05/1990', h: '1m83', club: 'Man. City', caps: 82, goals: 1, ast: 6, debut: '12/11/2011', photo: 'images/players/44614.webp', role: 'Titulaire', bio: 'Latéral droit de Man. City, vitesse et expérience.' },
      { id: 'en3', name: 'John STONES', pos: 'Défenseur', n: 5, age: 29, born: '28/05/1994', h: '1m88', club: 'Man. City', caps: 72, goals: 3, ast: 4, debut: '30/05/2014', photo: 'images/players/tsdb_john_stones.jpg', role: 'Titulaire', bio: 'Défenseur central de Man. City, technique et intelligent.' },
      { id: 'en4', name: 'Harry MAGUIRE', pos: 'Défenseur', n: 6, age: 31, born: '05/03/1993', h: '1m94', club: 'Man. United', caps: 62, goals: 7, ast: 2, debut: '08/10/2017', photo: 'images/players/tsdb_harry_maguire.jpg', role: 'Titulaire', bio: 'Défenseur central de Manchester United.' },
      { id: 'en5', name: 'Luke SHAW', pos: 'Défenseur', n: 3, age: 28, born: '12/07/1995', h: '1m85', club: 'Man. United', caps: 32, goals: 1, ast: 4, debut: '30/05/2014', photo: 'images/players/tsdb_luke_shaw.jpg', role: 'Titulaire', bio: 'Latéral gauche de Manchester United.' },
      { id: 'en6', name: 'Declan RICE', pos: 'Milieu', n: 4, age: 25, born: '14/01/1999', h: '1m85', club: 'Arsenal FC', caps: 52, goals: 4, ast: 8, debut: '22/03/2019', photo: 'images/players/tsdb_declan_rice.jpg', role: 'Titulaire', bio: 'Milieu défensif d\'Arsenal, l\'un des meilleurs du monde.' },
      { id: 'en7', name: 'Jude BELLINGHAM', pos: 'Milieu', n: 22, age: 20, born: '29/06/2003', h: '1m86', club: 'Real Madrid', caps: 42, goals: 12, ast: 10, debut: '12/11/2020', photo: 'images/players/tsdb_jude_bellingham.jpg', role: 'Titulaire', bio: 'Prodige du Real Madrid, meilleur jeune joueur du monde.' },
      { id: 'en8', name: 'Phil FODEN', pos: 'Milieu', n: 11, age: 24, born: '28/05/2000', h: '1m71', club: 'Man. City', caps: 42, goals: 8, ast: 12, debut: '07/09/2020', photo: 'images/players/tsdb_phil_foden.jpg', role: 'Titulaire', bio: 'Milieu offensif de Man. City, technique exceptionnelle.' },
      { id: 'en9', name: 'Harry KANE', pos: 'Attaquant', n: 9, age: 30, born: '28/07/1993', h: '1m88', club: 'Bayern Munich', caps: 92, goals: 68, ast: 18, debut: '27/03/2015', photo: 'images/players/tsdb_harry_kane.jpg', role: 'Titulaire', bio: 'Capitaine de l\'Angleterre, meilleur buteur de l\'histoire des Three Lions avec 68 buts.' },
      { id: 'en10', name: 'Bukayo SAKA', pos: 'Attaquant', n: 7, age: 22, born: '05/09/2001', h: '1m78', club: 'Arsenal FC', caps: 42, goals: 12, ast: 16, debut: '08/10/2020', photo: 'images/players/tsdb_bukayo_saka.jpg', role: 'Titulaire', bio: 'Ailier d\'Arsenal, l\'un des meilleurs joueurs de Premier League.' },
      { id: 'en11', name: 'Marcus RASHFORD', pos: 'Attaquant', n: 10, age: 26, born: '31/10/1997', h: '1m80', club: 'Man. United', caps: 62, goals: 17, ast: 10, debut: '11/11/2016', photo: 'images/players/814590.webp', role: 'Titulaire', bio: 'Attaquant de Manchester United.' },
      { id: 'en12', name: 'Aaron RAMSDALE', pos: 'Gardien', n: 22, age: 26, born: '14/05/1998', h: '1m88', club: 'Southampton', caps: 8, goals: 0, ast: 0, debut: '12/11/2020', photo: 'images/players/839410.webp', role: 'Remplaçant', bio: 'Gardien de Southampton.' },
      { id: 'en13', name: 'Trent ALEXANDER-ARNOLD', pos: 'Défenseur', n: 66, age: 25, born: '07/10/1998', h: '1m75', club: 'Real Madrid', caps: 32, goals: 2, ast: 8, debut: '07/09/2018', photo: 'images/players/tsdb_trent_alexander_arnold.jpg', role: 'Remplaçant', bio: 'Latéral droit du Real Madrid.' },
      { id: 'en14', name: 'Conor GALLAGHER', pos: 'Milieu', n: 12, age: 24, born: '06/02/2000', h: '1m82', club: 'Atlético Madrid', caps: 18, goals: 2, ast: 2, debut: '12/11/2020', photo: 'images/players/904970.webp', role: 'Remplaçant', bio: 'Milieu de l\'Atlético Madrid.' },
      { id: 'en15', name: 'Kobbie MAINOO', pos: 'Milieu', n: 26, age: 19, born: '19/04/2005', h: '1m78', club: 'Man. United', caps: 8, goals: 1, ast: 1, debut: '22/03/2024', photo: 'images/players/tsdb_kobbie_mainoo.jpg', role: 'Remplaçant', bio: 'Prodige de Manchester United.' },
      { id: 'en16', name: 'Jarrod BOWEN', pos: 'Attaquant', n: 20, age: 27, born: '20/12/1996', h: '1m74', club: 'West Ham', caps: 18, goals: 4, ast: 4, debut: '12/11/2020', photo: 'images/players/tsdb_jarrod_bowen.jpg', role: 'Remplaçant', bio: 'Ailier de West Ham.' },
      { id: 'en17', name: 'Ollie WATKINS', pos: 'Attaquant', n: 11, age: 28, born: '30/12/1995', h: '1m80', club: 'Aston Villa', caps: 18, goals: 6, ast: 4, debut: '12/11/2020', photo: 'images/players/tsdb_ollie_watkins.jpg', role: 'Remplaçant', bio: 'Attaquant d\'Aston Villa.' },
      { id: 'aar23', name: 'Aaron RAMSDALE', pos: 'Gardien', n: 23, age: 26, born: '01/01/1998', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/839410.webp', role: 'Titulaire', bio: 'Gardien de l\'équipe Angleterre.' },
      { id: 'con24', name: 'Conor GALLAGHER', pos: 'Milieu', n: 16, age: 24, born: '01/01/2000', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/904970.webp', role: 'Titulaire', bio: 'Milieu de l\'équipe Angleterre.' },
      { id: 'mas25', name: 'Mason MOUNT', pos: 'Milieu', n: 19, age: 25, born: '01/01/1999', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_mason_mount.jpg', role: 'Titulaire', bio: 'Milieu de l\'équipe Angleterre.' },
      { id: 'jac26', name: 'Jack GREALISH', pos: 'Attaquant', n: 7, age: 28, born: '01/01/1996', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/795696.webp', role: 'Titulaire', bio: 'Attaquant de l\'équipe Angleterre.' },
      { id: 'cal27', name: 'Callum WILSON', pos: 'Attaquant', n: 24, age: 32, born: '01/01/1992', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_callum_wilson.jpg', role: 'Titulaire', bio: 'Attaquant de l\'équipe Angleterre.' },
      { id: 'nic28', name: 'Nick POPE', pos: 'Gardien', n: 13, age: 32, born: '01/01/1992', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_nick_pope.jpg', role: 'Remplaçant', bio: 'Gardien de l\'équipe Angleterre.' }
    ]
  },
  'Allemagne': { flag: '🇩🇪',
    coach: 'Julian Nagelsmann', formation: '4-2-3-1', confederation: 'UEFA', titles: 0,
    players: [
{ id: 'de1', name: 'Manuel NEUER', pos: 'Gardien', n: 1, age: 38, born: '27/03/1986', h: '1m93', club: 'Bayern Munich', caps: 117, goals: 1, ast: 0, debut: '02/06/2009', photo: 'images/players/dfb_dc_manuel-neuer.jpg', role: 'Titulaire', bio: 'Légende du football mondial, 117 sélections avec la Mannschaft.' },
      { id: 'de2', name: 'Joshua KIMMICH', pos: 'Défenseur', n: 6, age: 29, born: '08/02/1995', h: '1m77', club: 'Bayern Munich', caps: 82, goals: 8, ast: 22, debut: '04/09/2015', photo: 'images/players/dfb_dc_joshua-kimmich.jpg', role: 'Titulaire', bio: 'Latéral droit ou milieu du Bayern Munich, polyvalence exceptionnelle.' },
      { id: 'de3', name: 'Antonio RÜDIGER', pos: 'Défenseur', n: 2, age: 31, born: '03/03/1993', h: '1m90', club: 'Real Madrid', caps: 72, goals: 4, ast: 2, debut: '05/03/2014', photo: 'images/players/dfb_dc_antonio-rudiger.jpg', role: 'Titulaire', bio: 'Défenseur central du Real Madrid, puissance et leadership.' },
      { id: 'de4', name: 'Jonathan TAH', pos: 'Défenseur', n: 4, age: 28, born: '11/02/1996', h: '1m95', club: 'Bayer Leverkusen', caps: 32, goals: 2, ast: 1, debut: '29/05/2016', photo: 'images/players/dfb_dc_jonathan-tah.jpg', role: 'Titulaire', bio: 'Défenseur central de Bayer Leverkusen.' },
      { id: 'de5', name: 'David RAUM', pos: 'Défenseur', n: 3, age: 26, born: '22/04/1998', h: '1m80', club: 'RB Leipzig', caps: 28, goals: 2, ast: 6, debut: '02/09/2021', photo: 'images/players/dfb_dc_david-raum.jpg', role: 'Titulaire', bio: 'Latéral gauche de RB Leipzig, offensif et dynamique.' },
      { id: 'de6', name: 'Toni KROOS', pos: 'Milieu', n: 8, age: 34, born: '04/01/1990', h: '1m83', club: 'Real Madrid', caps: 106, goals: 17, ast: 28, debut: '17/03/2010', photo: 'images/players/dfb_dc_toni-kroos.jpg', role: 'Titulaire', bio: 'Légende du Real Madrid et de la Mannschaft. Revenu de retraite pour l\'Euro 2024.' },
      { id: 'de7', name: 'Florian WIRTZ', pos: 'Milieu', n: 10, age: 21, born: '03/05/2003', h: '1m76', club: 'Bayer Leverkusen', caps: 22, goals: 6, ast: 10, debut: '26/03/2022', photo: 'images/players/dfb_dc_florian-wirtz.jpg', role: 'Titulaire', bio: 'Prodige de Bayer Leverkusen, meilleur jeune joueur de Bundesliga.' },
      { id: 'de8', name: 'Jamal MUSIALA', pos: 'Milieu', n: 14, age: 21, born: '26/02/2003', h: '1m80', club: 'Bayern Munich', caps: 38, goals: 10, ast: 12, debut: '25/03/2021', photo: 'images/players/dfb_dc_jamal-musiala.jpg', role: 'Titulaire', bio: 'Milieu offensif du Bayern Munich, technique et créativité.' },
      { id: 'de9', name: 'Kai HAVERTZ', pos: 'Attaquant', n: 7, age: 25, born: '11/06/1999', h: '1m89', club: 'Arsenal FC', caps: 52, goals: 18, ast: 8, debut: '09/09/2018', photo: 'images/players/dfb_dc_kai-havertz.jpg', role: 'Titulaire', bio: 'Attaquant d\'Arsenal, polyvalent et technique.' },
      { id: 'de10', name: 'Leroy SANÉ', pos: 'Attaquant', n: 19, age: 28, born: '11/01/1996', h: '1m83', club: 'Bayern Munich', caps: 62, goals: 14, ast: 18, debut: '22/03/2015', photo: 'images/players/dfb_dc_leroy-sane.jpg', role: 'Titulaire', bio: 'Ailier du Bayern Munich, vitesse et technique.' },
      { id: 'de11', name: 'Thomas MÜLLER', pos: 'Attaquant', n: 13, age: 34, born: '13/09/1989', h: '1m85', club: 'Bayern Munich', caps: 131, goals: 45, ast: 40, debut: '03/03/2010', photo: 'images/players/dfb_dc_thomas-muller.jpg', role: 'Titulaire', bio: 'Légende du Bayern Munich et de la Mannschaft, 131 sélections.' },
      { id: 'de12', name: 'Marc-André TER STEGEN', pos: 'Gardien', n: 22, age: 32, born: '30/04/1992', h: '1m87', club: 'FC Barcelone', caps: 42, goals: 0, ast: 0, debut: '29/02/2012', photo: 'images/players/dfb_dc_marc-andre-ter-stegen.jpg', role: 'Remplaçant', bio: 'Gardien du FC Barcelone.' },
      { id: 'de13', name: 'Benjamin PAVARD', pos: 'Défenseur', n: 5, age: 28, born: '28/03/1996', h: '1m86', club: 'Inter Milan', caps: 62, goals: 4, ast: 4, debut: '10/11/2017', photo: 'images/players/dfb_dc_benjamin-pavard.jpg', role: 'Remplaçant', bio: 'Défenseur de l\'Inter Milan.' },
      { id: 'de14', name: 'Maximilian MITTELSTÄDT', pos: 'Défenseur', n: 18, age: 27, born: '18/03/1997', h: '1m80', club: 'Stuttgart', caps: 12, goals: 1, ast: 2, debut: '25/03/2023', photo: 'images/players/dfb_dc_maximilian-mittelstadt.jpg', role: 'Remplaçant', bio: 'Latéral gauche de Stuttgart.' },
      { id: 'de15', name: 'Pascal GROSS', pos: 'Milieu', n: 13, age: 32, born: '15/06/1991', h: '1m80', club: 'Dortmund', caps: 12, goals: 2, ast: 4, debut: '25/03/2023', photo: 'images/players/dfb_dc_pascal-gross.jpg', role: 'Remplaçant', bio: 'Milieu de Dortmund.' },
      { id: 'de16', name: 'Niclas FÜLLKRUG', pos: 'Attaquant', n: 9, age: 31, born: '09/02/1993', h: '1m89', club: 'West Ham', caps: 18, goals: 8, ast: 2, debut: '25/03/2023', photo: 'images/players/dfb_dc_niclas-fullkrug.jpg', role: 'Remplaçant', bio: 'Attaquant de West Ham.' },
      { id: 'de17', name: 'Chris FÜHRICH', pos: 'Attaquant', n: 17, age: 26, born: '09/12/1997', h: '1m76', club: 'Stuttgart', caps: 8, goals: 2, ast: 2, debut: '25/03/2023', photo: 'images/players/dfb_dc_chris-fuhrich.jpg', role: 'Remplaçant', bio: 'Ailier de Stuttgart.' },
      { id: 'kev23', name: 'Kevin TRAPP', pos: 'Gardien', n: 12, age: 33, born: '01/01/1991', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/dfb_dc_kevin-trapp.jpg', role: 'Titulaire', bio: 'Gardien de l\'équipe Allemagne.' },
      { id: 'mat24', name: 'Matthias GINTER', pos: 'Défenseur', n: 4, age: 30, born: '01/01/1994', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/dfb_dc_matthias-ginter.jpg', role: 'Titulaire', bio: 'Défenseur de l\'équipe Allemagne.' },
      { id: 'chr25', name: 'Christian GÜNTER', pos: 'Défenseur', n: 20, age: 31, born: '01/01/1993', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/dfb_dc_christian-gunter.jpg', role: 'Titulaire', bio: 'Défenseur de l\'équipe Allemagne.' },
      { id: 'jul26', name: 'Julian BRANDT', pos: 'Milieu', n: 17, age: 28, born: '01/01/1996', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/dfb_dc_julian-brandt.jpg', role: 'Titulaire', bio: 'Milieu de l\'équipe Allemagne.' },
      { id: 'kar27', name: 'Karim ADEYEMI', pos: 'Attaquant', n: 24, age: 22, born: '01/01/2002', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/dfb_dc_karim-adeyemi.jpg', role: 'Titulaire', bio: 'Attaquant de l\'équipe Allemagne.' },
      { id: 'nic28', name: 'Niclas FÜLLKRUG', pos: 'Attaquant', n: 9, age: 31, born: '01/01/1993', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/132645.webp', role: 'Titulaire', bio: 'Attaquant de l\'équipe Allemagne.' }
    ]
  },
  'Pays-Bas': { flag: '🇳🇱',
    coach: 'Ronald Koeman', formation: '4-3-3', confederation: 'UEFA', titles: 0,
    players: [
{ id: 'nl1', name: 'Bart VERBRUGGEN', pos: 'Gardien', n: 1, age: 22, born: '18/08/2002', h: '1m90', club: 'Brighton', caps: 12, goals: 0, ast: 0, debut: '26/03/2023', photo: 'images/players/tsdb_bart_verbruggen.jpg', role: 'Titulaire', bio: 'Jeune gardien de Brighton, titulaire des Pays-Bas.' },
      { id: 'nl2', name: 'Denzel DUMFRIES', pos: 'Défenseur', n: 22, age: 28, born: '18/04/1996', h: '1m88', club: 'Inter Milan', caps: 52, goals: 6, ast: 10, debut: '10/10/2018', photo: 'images/players/tsdb_denzel_dumfries.jpg', role: 'Titulaire', bio: 'Latéral droit de l\'Inter Milan, puissance et dynamisme.' },
      { id: 'nl3', name: 'Virgil VAN DIJK', pos: 'Défenseur', n: 4, age: 32, born: '08/07/1991', h: '1m93', club: 'Liverpool FC', caps: 62, goals: 8, ast: 4, debut: '10/08/2015', photo: 'images/players/tsdb_virgil_van_dijk.jpg', role: 'Titulaire', bio: 'Capitaine des Pays-Bas, l\'un des meilleurs défenseurs de l\'histoire.' },
      { id: 'nl4', name: 'Stefan DE VRIJ', pos: 'Défenseur', n: 6, age: 32, born: '05/02/1992', h: '1m89', club: 'Inter Milan', caps: 52, goals: 4, ast: 2, debut: '14/08/2013', photo: 'images/players/tsdb_stefan_de_vrij.jpg', role: 'Titulaire', bio: 'Défenseur central de l\'Inter Milan.' },
      { id: 'nl5', name: 'Nathan AKÉ', pos: 'Défenseur', n: 5, age: 29, born: '18/02/1995', h: '1m80', club: 'Man. City', caps: 42, goals: 3, ast: 2, debut: '13/11/2017', photo: 'images/players/149663.webp', role: 'Titulaire', bio: 'Défenseur central de Man. City.' },
      { id: 'nl6', name: 'Frenkie DE JONG', pos: 'Milieu', n: 21, age: 27, born: '12/05/1997', h: '1m80', club: 'FC Barcelone', caps: 62, goals: 4, ast: 12, debut: '06/09/2018', photo: 'images/players/tsdb_frenkie_de_jong.jpg', role: 'Titulaire', bio: 'Milieu du FC Barcelone, technique et vision du jeu.' },
      { id: 'nl7', name: 'Tijjani REIJNDERS', pos: 'Milieu', n: 14, age: 26, born: '29/07/1998', h: '1m85', club: 'AC Milan', caps: 22, goals: 4, ast: 6, debut: '25/03/2023', photo: 'images/players/tsdb_tijjani_reijnders.jpg', role: 'Titulaire', bio: 'Milieu de l\'AC Milan, révélation de la saison.' },
      { id: 'nl8', name: 'Xavi SIMONS', pos: 'Milieu', n: 10, age: 21, born: '21/04/2003', h: '1m74', club: 'RB Leipzig', caps: 22, goals: 6, ast: 8, debut: '25/03/2023', photo: 'images/players/tsdb_xavi_simons.jpg', role: 'Titulaire', bio: 'Milieu offensif de RB Leipzig, grande promesse du football néerlandais.' },
      { id: 'nl9', name: 'Cody GAKPO', pos: 'Attaquant', n: 11, age: 25, born: '07/05/1999', h: '1m89', club: 'Liverpool FC', caps: 38, goals: 14, ast: 8, debut: '11/11/2021', photo: 'images/players/tsdb_cody_gakpo.jpg', role: 'Titulaire', bio: 'Ailier de Liverpool, décisif en sélection.' },
      { id: 'nl10', name: 'Memphis DEPAY', pos: 'Attaquant', n: 10, age: 30, born: '13/02/1994', h: '1m76', club: 'Atlético Madrid', caps: 92, goals: 44, ast: 22, debut: '09/08/2013', photo: 'images/players/tsdb_memphis_depay.jpg', role: 'Titulaire', bio: 'Légende des Pays-Bas, 92 sélections et 44 buts.' },
      { id: 'nl11', name: 'Donyell MALEN', pos: 'Attaquant', n: 18, age: 25, born: '19/01/1999', h: '1m78', club: 'Dortmund', caps: 32, goals: 8, ast: 6, debut: '05/09/2020', photo: 'images/players/tsdb_donyell_malen.jpg', role: 'Titulaire', bio: 'Ailier de Dortmund, vitesse et finition.' },
      { id: 'jus23', name: 'Justin BIJLOW', pos: 'Gardien', n: 13, age: 26, born: '01/01/1998', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/556696.webp', role: 'Titulaire', bio: 'Gardien de l\'équipe Pays-Bas.' },
      { id: 'rem24', name: 'Remko PASVEER', pos: 'Gardien', n: 22, age: 40, born: '01/01/1984', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/2622.webp', role: 'Remplaçant', bio: 'Gardien de l\'équipe Pays-Bas.' },
      { id: 'jur25', name: 'Jurriën TIMBER', pos: 'Défenseur', n: 2, age: 23, born: '01/01/2001', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/958959.webp', role: 'Titulaire', bio: 'Défenseur de l\'équipe Pays-Bas.' },
      { id: 'ste26', name: 'Stefan DE VRIJ', pos: 'Défenseur', n: 6, age: 32, born: '01/01/1992', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_stefan_de_vrij.jpg', role: 'Titulaire', bio: 'Défenseur de l\'équipe Pays-Bas.' },
      { id: 'tyr27', name: 'Tyrell MALACIA', pos: 'Défenseur', n: 16, age: 24, born: '01/01/2000', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/825839.webp', role: 'Titulaire', bio: 'Défenseur de l\'équipe Pays-Bas.' },
      { id: 'mat28', name: 'Matthijs DE LIGT', pos: 'Défenseur', n: 3, age: 24, born: '01/01/2000', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_matthijs_de_ligt.jpg', role: 'Titulaire', bio: 'Défenseur de l\'équipe Pays-Bas.' },
      { id: 'teu29', name: 'Teun KOOPMEINERS', pos: 'Milieu', n: 20, age: 26, born: '01/01/1998', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/803033.webp', role: 'Titulaire', bio: 'Milieu de l\'équipe Pays-Bas.' },
      { id: 'mar30', name: 'Marten DE ROON', pos: 'Milieu', n: 15, age: 33, born: '01/01/1991', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/100389.webp', role: 'Titulaire', bio: 'Milieu de l\'équipe Pays-Bas.' },
      { id: 'ken31', name: 'Kenneth TAYLOR', pos: 'Milieu', n: 24, age: 22, born: '01/01/2002', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/959806.webp', role: 'Titulaire', bio: 'Milieu de l\'équipe Pays-Bas.' },
      { id: 'ste32', name: 'Steven BERGHUIS', pos: 'Attaquant', n: 11, age: 32, born: '01/01/1992', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_steven_berghuis.jpg', role: 'Titulaire', bio: 'Attaquant de l\'équipe Pays-Bas.' },
      { id: 'luu33', name: 'Luuk DE JONG', pos: 'Attaquant', n: 9, age: 33, born: '01/01/1991', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_luuk_de_jong.jpg', role: 'Titulaire', bio: 'Attaquant de l\'équipe Pays-Bas.' },
      { id: 'wou34', name: 'Wout WEGHORST', pos: 'Attaquant', n: 19, age: 31, born: '01/01/1993', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/252215.webp', role: 'Titulaire', bio: 'Attaquant de l\'équipe Pays-Bas.' }
    ]
  },
  'Belgique': { flag: '🇧🇪',
    coach: 'Domenico Tedesco', formation: '4-3-3', confederation: 'UEFA', titles: 0,
    players: [
{ id: 'be1', name: 'Koen CASTEELS', pos: 'Gardien', n: 1, age: 32, born: '25/06/1992', h: '1m96', club: 'Al-Qadsiah', caps: 22, goals: 0, ast: 0, debut: '29/05/2018', photo: 'images/players/70987.webp', role: 'Titulaire', bio: 'Gardien titulaire de la Belgique.' },
      { id: 'be2', name: 'Timothy CASTAGNE', pos: 'Défenseur', n: 2, age: 28, born: '05/12/1995', h: '1m84', club: 'Fulham', caps: 42, goals: 2, ast: 6, debut: '07/10/2018', photo: 'images/players/tsdb_timothy_castagne.jpg', role: 'Titulaire', bio: 'Latéral droit de Fulham.' },
      { id: 'be3', name: 'Wout FAES', pos: 'Défenseur', n: 4, age: 26, born: '03/04/1998', h: '1m87', club: 'Leicester', caps: 22, goals: 1, ast: 0, debut: '25/03/2022', photo: 'images/players/252215.webp', role: 'Titulaire', bio: 'Défenseur central de Leicester.' },
      { id: 'be4', name: 'Jan VERTONGHEN', pos: 'Défenseur', n: 5, age: 37, born: '24/04/1987', h: '1m89', club: 'Anderlecht', caps: 152, goals: 10, ast: 8, debut: '04/06/2007', photo: 'images/players/tsdb_jan_vertonghen.jpg', role: 'Titulaire', bio: 'Légende de la Belgique, 152 sélections. l\'un des meilleurs défenseurs de sa génération.' },
      { id: 'be5', name: 'Théo BONGONDA', pos: 'Défenseur', n: 3, age: 28, born: '20/11/1996', h: '1m74', club: 'Genk', caps: 8, goals: 0, ast: 2, debut: '10/10/2020', photo: 'images/players/344953.webp', role: 'Titulaire', bio: 'Latéral gauche de Genk.' },
      { id: 'be6', name: 'Axel WITSEL', pos: 'Milieu', n: 6, age: 35, born: '12/01/1989', h: '1m83', club: 'Atlético Madrid', caps: 132, goals: 12, ast: 14, debut: '26/05/2008', photo: 'images/players/tsdb_axel_witsel.jpg', role: 'Titulaire', bio: 'Milieu expérimenté, 132 sélections avec les Diables Rouges.' },
      { id: 'be7', name: 'Youri TIELEMANS', pos: 'Milieu', n: 8, age: 27, born: '07/05/1997', h: '1m76', club: 'Aston Villa', caps: 62, goals: 12, ast: 14, debut: '07/10/2016', photo: 'images/players/331737.webp', role: 'Titulaire', bio: 'Milieu d\'Aston Villa, créatif et technique.' },
      { id: 'be8', name: 'Kevin DE BRUYNE', pos: 'Milieu', n: 7, age: 32, born: '28/06/1991', h: '1m81', club: 'Man. City', caps: 102, goals: 26, ast: 48, debut: '11/08/2010', photo: 'images/players/tsdb_kevin_de_bruyne.jpg', role: 'Titulaire', bio: 'Capitaine de la Belgique. L\'un des meilleurs milieux de l\'histoire du football.' },
      { id: 'be9', name: 'Romelu LUKAKU', pos: 'Attaquant', n: 9, age: 30, born: '13/05/1993', h: '1m90', club: 'Napoli', caps: 112, goals: 84, ast: 22, debut: '03/03/2010', photo: 'images/players/tsdb_romelu_lukaku.jpg', role: 'Titulaire', bio: 'Meilleur buteur de l\'histoire de la Belgique avec 84 buts en 112 sélections.' },
      { id: 'be10', name: 'Leandro TROSSARD', pos: 'Attaquant', n: 11, age: 29, born: '04/12/1994', h: '1m73', club: 'Arsenal FC', caps: 42, goals: 12, ast: 10, debut: '10/10/2019', photo: 'images/players/135666.webp', role: 'Titulaire', bio: 'Ailier d\'Arsenal, technique et décisif.' },
      { id: 'be11', name: 'Lois OPENDA', pos: 'Attaquant', n: 10, age: 24, born: '16/02/2000', h: '1m78', club: 'RB Leipzig', caps: 22, goals: 8, ast: 4, debut: '25/03/2023', photo: 'images/players/835480.webp', role: 'Titulaire', bio: 'Attaquant de RB Leipzig, grande révélation de la saison.' },
      { id: 'koe23', name: 'Koen CASTEELS', pos: 'Gardien', n: 13, age: 31, born: '01/01/1993', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/70987.webp', role: 'Titulaire', bio: 'Gardien de l\'équipe Belgique.' },
      { id: 'sim24', name: 'Simon MIGNOLET', pos: 'Gardien', n: 12, age: 36, born: '01/01/1988', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/10406.webp', role: 'Remplaçant', bio: 'Gardien de l\'équipe Belgique.' },
      { id: 'art25', name: 'Arthur THEATE', pos: 'Défenseur', n: 3, age: 24, born: '01/01/2000', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/965778.webp', role: 'Titulaire', bio: 'Défenseur de l\'équipe Belgique.' },
      { id: 'wou26', name: 'Wout FAES', pos: 'Défenseur', n: 4, age: 26, born: '01/01/1998', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/252215.webp', role: 'Titulaire', bio: 'Défenseur de l\'équipe Belgique.' },
      { id: 'zen27', name: 'Zeno DEBAST', pos: 'Défenseur', n: 2, age: 20, born: '01/01/2004', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1126512.webp', role: 'Titulaire', bio: 'Défenseur de l\'équipe Belgique.' },
      { id: 'tho28', name: 'Thomas MEUNIER', pos: 'Défenseur', n: 15, age: 32, born: '01/01/1992', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_thomas_meunier.jpg', role: 'Titulaire', bio: 'Défenseur de l\'équipe Belgique.' },
      { id: 'ama29', name: 'Amadou ONANA', pos: 'Milieu', n: 24, age: 22, born: '01/01/2002', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/923973.webp', role: 'Titulaire', bio: 'Milieu de l\'équipe Belgique.' },
      { id: 'han30', name: 'Hans VANAKEN', pos: 'Milieu', n: 20, age: 31, born: '01/01/1993', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/118085.webp', role: 'Titulaire', bio: 'Milieu de l\'équipe Belgique.' },
      { id: 'lea31', name: 'Leandro TROSSARD', pos: 'Attaquant', n: 11, age: 29, born: '01/01/1995', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/135666.webp', role: 'Titulaire', bio: 'Attaquant de l\'équipe Belgique.' },
      { id: 'cha32', name: 'Charles DE KETELAERE', pos: 'Attaquant', n: 22, age: 23, born: '01/01/2001', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/960441.webp', role: 'Titulaire', bio: 'Attaquant de l\'équipe Belgique.' },
      { id: 'dri33', name: 'Dries MERTENS', pos: 'Attaquant', n: 14, age: 37, born: '01/01/1987', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/32493.webp', role: 'Titulaire', bio: 'Attaquant de l\'équipe Belgique.' },
      { id: 'mic34', name: 'Michy BATSHUAYI', pos: 'Attaquant', n: 23, age: 30, born: '01/01/1994', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_michy_batshuayi.jpg', role: 'Remplaçant', bio: 'Attaquant de l\'équipe Belgique.' }
    ]
  },
  'Maroc': { flag: '🇲🇦',
    coach: 'Walid Regragui', formation: '4-3-3', confederation: 'CAF', titles: 0,
    players: [
{ id: 'ma1', name: 'Yassine BOUNOU', pos: 'Gardien', n: 1, age: 33, born: '05/04/1991', h: '1m92', club: 'Al-Hilal', caps: 52, goals: 0, ast: 0, debut: '09/01/2018', photo: 'images/players/tm_yassine_bounou.jpg', role: 'Titulaire', bio: 'Héros de la Coupe du Monde 2022, gardien légendaire du Maroc.' },
      { id: 'ma2', name: 'Achraf HAKIMI', pos: 'Défenseur', n: 2, age: 25, born: '04/11/1998', h: '1m81', club: 'PSG', caps: 72, goals: 12, ast: 18, debut: '09/01/2016', photo: 'images/players/tsdb_achraf_hakimi.jpg', role: 'Titulaire', bio: 'Capitaine du Maroc, latéral droit du PSG, l\'un des meilleurs du monde.' },
      { id: 'ma3', name: 'Romain SAÏSS', pos: 'Défenseur', n: 5, age: 34, born: '26/03/1990', h: '1m87', club: 'Besiktas', caps: 82, goals: 6, ast: 4, debut: '05/03/2013', photo: 'images/players/187729.webp', role: 'Titulaire', bio: 'Défenseur central expérimenté, pilier de la défense marocaine.' },
      { id: 'ma4', name: 'Nayef AGUERD', pos: 'Défenseur', n: 6, age: 28, born: '30/03/1996', h: '1m89', club: 'West Ham', caps: 42, goals: 4, ast: 2, debut: '09/10/2019', photo: 'images/players/877102.webp', role: 'Titulaire', bio: 'Défenseur central de West Ham.' },
      { id: 'ma5', name: 'Noussair MAZRAOUI', pos: 'Défenseur', n: 3, age: 26, born: '14/11/1997', h: '1m82', club: 'Man. United', caps: 38, goals: 2, ast: 6, debut: '09/01/2018', photo: 'images/players/tsdb_noussair_mazraoui.jpg', role: 'Titulaire', bio: 'Latéral droit de Manchester United.' },
      { id: 'ma6', name: 'Sofyan AMRABAT', pos: 'Milieu', n: 4, age: 27, born: '21/08/1996', h: '1m80', club: 'Fiorentina', caps: 52, goals: 2, ast: 4, debut: '09/01/2018', photo: 'images/players/tsdb_sofyan_amrabat.jpg', role: 'Titulaire', bio: 'Milieu défensif de la Fiorentina, révélation du Mondial 2022.' },
      { id: 'ma7', name: 'Azzedine OUNAHI', pos: 'Milieu', n: 8, age: 24, born: '19/04/2000', h: '1m80', club: 'OM', caps: 28, goals: 3, ast: 6, debut: '09/10/2021', photo: 'images/players/991421.webp', role: 'Titulaire', bio: 'Milieu de l\'OM, révélation de la Coupe du Monde 2022.' },
      { id: 'ma8', name: 'Selim AMALLAH', pos: 'Milieu', n: 10, age: 27, born: '15/11/1996', h: '1m80', club: 'Standard Liège', caps: 22, goals: 4, ast: 4, debut: '09/10/2019', photo: 'images/players/801211.webp', role: 'Titulaire', bio: 'Milieu offensif du Standard Liège.' },
      { id: 'ma9', name: 'Hakim ZIYECH', pos: 'Attaquant', n: 7, age: 31, born: '19/03/1993', h: '1m81', club: 'Galatasaray', caps: 62, goals: 22, ast: 18, debut: '09/01/2015', photo: 'images/players/249437.webp', role: 'Titulaire', bio: 'Ailier de Galatasaray, technique et créativité.' },
      { id: 'ma10', name: 'Youssef EN-NESYRI', pos: 'Attaquant', n: 9, age: 27, born: '01/06/1997', h: '1m89', club: 'Fenerbahçe', caps: 52, goals: 22, ast: 8, debut: '09/01/2018', photo: 'https://img.sofascore.com/api/v1/player/1106352/image', role: 'Titulaire', bio: 'Attaquant de Fenerbahçe, buteur prolifique du Maroc.' },
      { id: 'ma11', name: 'Sofiane BOUFAL', pos: 'Attaquant', n: 11, age: 30, born: '17/09/1993', h: '1m75', club: 'Angers', caps: 42, goals: 8, ast: 12, debut: '09/01/2015', photo: 'images/players/257205.webp', role: 'Titulaire', bio: 'Ailier d\'Angers, technique et dribbleur.' },
      { id: 'mun23', name: 'Munir MOHAMEDI', pos: 'Gardien', n: 12, age: 35, born: '01/01/1989', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/796291.webp', role: 'Titulaire', bio: 'Gardien de l\'équipe Maroc.' },
      { id: 'ahm24', name: 'Ahmed TAGNAOUTI', pos: 'Gardien', n: 22, age: 28, born: '01/01/1996', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/359280.webp', role: 'Remplaçant', bio: 'Gardien de l\'équipe Maroc.' },
      { id: 'bad25', name: 'Badr BENOUN', pos: 'Défenseur', n: 24, age: 30, born: '01/01/1994', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/906597.webp', role: 'Titulaire', bio: 'Défenseur de l\'équipe Maroc.' },
      { id: 'yah26', name: 'Yahia ATTIYAT ALLAH', pos: 'Défenseur', n: 25, age: 29, born: '01/01/1995', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_yahia_attiyat_allah.jpg', role: 'Titulaire', bio: 'Défenseur de l\'équipe Maroc.' },
      { id: 'jaw27', name: 'Jawad EL YAMIQ', pos: 'Défenseur', n: 18, age: 32, born: '01/01/1992', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/877103.webp', role: 'Titulaire', bio: 'Défenseur de l\'équipe Maroc.' },
      { id: 'azz28', name: 'Azzedine OUNAHI', pos: 'Milieu', n: 8, age: 24, born: '01/01/2000', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/991421.webp', role: 'Titulaire', bio: 'Milieu de l\'équipe Maroc.' },
      { id: 'sel29', name: 'Selim AMALLAH', pos: 'Milieu', n: 15, age: 27, born: '01/01/1997', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/801211.webp', role: 'Titulaire', bio: 'Milieu de l\'équipe Maroc.' },
      { id: 'yah30', name: 'Yahya JABRANE', pos: 'Milieu', n: 26, age: 34, born: '01/01/1990', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/919712.webp', role: 'Titulaire', bio: 'Milieu de l\'équipe Maroc.' },
      { id: 'abd31', name: 'Abde EZZALZOULI', pos: 'Attaquant', n: 16, age: 22, born: '01/01/2002', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tm_abde_ezzalzouli.jpg', role: 'Titulaire', bio: 'Attaquant de l\'équipe Maroc.' },
      { id: 'zak32', name: 'Zakaria ABOUKHLAL', pos: 'Attaquant', n: 14, age: 24, born: '01/01/2000', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_zakaria_aboukhlal.jpg', role: 'Titulaire', bio: 'Attaquant de l\'équipe Maroc.' },
      { id: 'sof33', name: 'Sofiane BOUFAL', pos: 'Attaquant', n: 17, age: 30, born: '01/01/1994', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/257205.webp', role: 'Titulaire', bio: 'Attaquant de l\'équipe Maroc.' },
      { id: 'wal34', name: 'Walid CHEDDIRA', pos: 'Attaquant', n: 21, age: 26, born: '01/01/1998', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/917485.webp', role: 'Remplaçant', bio: 'Attaquant de l\'équipe Maroc.' }
    ]
  },
  'Japon': {
    coach: 'Hajime Moriyasu', formation: '4-3-3', confederation: 'AFC', titles: 0,
    players: [
{ id: 'jp1', name: 'Shuichi GONDA', pos: 'Gardien', n: 1, age: 34, born: '03/03/1989', h: '1m87', club: 'Shimizu S-Pulse', caps: 42, goals: 0, ast: 0, debut: '14/11/2012', photo: 'images/players/23952.webp', role: 'Titulaire', bio: 'Gardien expérimenté du Japon.' },
      { id: 'jp2', name: 'Hiroki SAKAI', pos: 'Défenseur', n: 2, age: 33, born: '12/04/1990', h: '1m78', club: 'Urawa Reds', caps: 72, goals: 2, ast: 6, debut: '06/09/2011', photo: 'images/players/873106.webp', role: 'Titulaire', bio: 'Latéral droit expérimenté.' },
      { id: 'jp3', name: 'Maya YOSHIDA', pos: 'Défenseur', n: 22, age: 35, born: '24/08/1988', h: '1m89', club: 'Vissel Kobe', caps: 122, goals: 8, ast: 4, debut: '07/09/2010', photo: 'images/players/24248.webp', role: 'Titulaire', bio: 'Capitaine légendaire du Japon, 122 sélections.' },
      { id: 'jp4', name: 'Ko ITAKURA', pos: 'Défenseur', n: 4, age: 27, born: '27/01/1997', h: '1m87', club: 'Borussia MG', caps: 28, goals: 2, ast: 1, debut: '25/03/2021', photo: 'images/players/790989.webp', role: 'Titulaire', bio: 'Défenseur central de Borussia Mönchengladbach.' },
      { id: 'jp5', name: 'Yuto NAGATOMO', pos: 'Défenseur', n: 5, age: 37, born: '12/09/1986', h: '1m70', club: 'FC Tokyo', caps: 142, goals: 4, ast: 12, debut: '24/01/2008', photo: 'images/players/34639.webp', role: 'Titulaire', bio: 'Légende du Japon, 142 sélections.' },
      { id: 'jp6', name: 'Wataru ENDO', pos: 'Milieu', n: 6, age: 31, born: '09/02/1993', h: '1m75', club: 'Liverpool FC', caps: 52, goals: 4, ast: 6, debut: '10/10/2017', photo: 'images/players/tsdb_wataru_endo.jpg', role: 'Titulaire', bio: 'Milieu défensif de Liverpool.' },
      { id: 'jp7', name: 'Hidemasa MORITA', pos: 'Milieu', n: 8, age: 29, born: '10/08/1994', h: '1m78', club: 'Sporting CP', caps: 32, goals: 3, ast: 4, debut: '10/10/2019', photo: 'images/players/926560.webp', role: 'Titulaire', bio: 'Milieu du Sporting CP.' },
      { id: 'jp8', name: 'Junya ITO', pos: 'Attaquant', n: 14, age: 31, born: '09/03/1993', h: '1m76', club: 'Reims', caps: 52, goals: 12, ast: 14, debut: '10/10/2017', photo: 'images/players/783278.webp', role: 'Titulaire', bio: 'Ailier de Reims, vitesse et technique.' },
      { id: 'jp9', name: 'Takumi MINAMINO', pos: 'Attaquant', n: 10, age: 29, born: '16/01/1995', h: '1m74', club: 'Monaco', caps: 62, goals: 22, ast: 14, debut: '10/10/2015', photo: 'images/players/tsdb_takumi_minamino.jpg', role: 'Titulaire', bio: 'Milieu offensif de Monaco.' },
      { id: 'jp10', name: 'Kaoru MITOMA', pos: 'Attaquant', n: 11, age: 27, born: '20/05/1997', h: '1m78', club: 'Brighton', caps: 32, goals: 8, ast: 10, debut: '25/03/2021', photo: 'images/players/tsdb_kaoru_mitoma.jpg', role: 'Titulaire', bio: 'Ailier de Brighton, révélation de Premier League.' },
      { id: 'jp11', name: 'Daichi KAMADA', pos: 'Attaquant', n: 7, age: 28, born: '05/08/1996', h: '1m80', club: 'Crystal Palace', caps: 42, goals: 12, ast: 10, debut: '10/10/2017', photo: 'images/players/tsdb_daichi_kamada.jpg', role: 'Remplaçant', bio: 'Milieu offensif de Crystal Palace.' },
      { id: 'eij23', name: 'Eiji KAWASHIMA', pos: 'Gardien', n: 1, age: 41, born: '01/01/1983', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_eiji_kawashima.jpg', role: 'Titulaire', bio: 'Gardien de l\'équipe Japon.' },
      { id: 'dan24', name: 'Daniel SCHMIDT', pos: 'Gardien', n: 23, age: 32, born: '01/01/1992', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'https://img.sofascore.com/api/v1/player/1015164/image', role: 'Remplaçant', bio: 'Gardien de l\'équipe Japon.' },
      { id: 'mik25', name: 'Miki YAMANE', pos: 'Défenseur', n: 2, age: 30, born: '01/01/1994', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/831926.webp', role: 'Titulaire', bio: 'Défenseur de l\'équipe Japon.' },
      { id: 'sho26', name: 'Shogo TANIGUCHI', pos: 'Défenseur', n: 3, age: 32, born: '01/01/1992', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/386958.webp', role: 'Titulaire', bio: 'Défenseur de l\'équipe Japon.' },
      { id: 'hir27', name: 'Hiroki ITO', pos: 'Défenseur', n: 26, age: 25, born: '01/01/1999', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/873106.webp', role: 'Titulaire', bio: 'Défenseur de l\'équipe Japon.' },
      { id: 'gak28', name: 'Gaku SHIBASAKI', pos: 'Milieu', n: 7, age: 32, born: '01/01/1992', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/148352.webp', role: 'Titulaire', bio: 'Milieu de l\'équipe Japon.' },
      { id: 'rit29', name: 'Ritsu DOAN', pos: 'Attaquant', n: 8, age: 25, born: '01/01/1999', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_ritsu_doan.jpg', role: 'Titulaire', bio: 'Attaquant de l\'équipe Japon.' },
      { id: 'tak30', name: 'Takumi MINAMINO', pos: 'Attaquant', n: 10, age: 29, born: '01/01/1995', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_takumi_minamino.jpg', role: 'Titulaire', bio: 'Attaquant de l\'équipe Japon.' },
      { id: 'yuk31', name: 'Yuki SOMA', pos: 'Attaquant', n: 24, age: 27, born: '01/01/1997', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/945290.webp', role: 'Titulaire', bio: 'Attaquant de l\'équipe Japon.' },
      { id: 'aya32', name: 'Ayase UEDA', pos: 'Attaquant', n: 21, age: 25, born: '01/01/1999', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/985823.webp', role: 'Remplaçant', bio: 'Attaquant de l\'équipe Japon.' },
      { id: 'shu33', name: 'Shuto MACHINO', pos: 'Attaquant', n: 20, age: 24, born: '01/01/2000', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_shuto_machino.jpg', role: 'Remplaçant', bio: 'Attaquant de l\'équipe Japon.' },
      { id: 'dai34', name: 'Daizen MAEDA', pos: 'Attaquant', n: 25, age: 26, born: '01/01/1998', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/832420.webp', role: 'Remplaçant', bio: 'Attaquant de l\'équipe Japon.' }
    ]
  },
  'Colombie': {
    coach: 'Néstor Lorenzo', formation: '4-3-3', confederation: 'CONMEBOL', titles: 0,
    players: [
{ id: 'co1', name: 'Camilo VARGAS', pos: 'Gardien', n: 1, age: 33, born: '08/03/1992', h: '1m87', club: 'Atlas', caps: 42, goals: 0, ast: 0, debut: '14/11/2014', photo: 'images/players/125787.webp', role: 'Titulaire', bio: 'Gardien titulaire de la Colombie.' },
      { id: 'co2', name: 'Daniel MUÑOZ', pos: 'Défenseur', n: 2, age: 27, born: '20/07/1996', h: '1m80', club: 'Crystal Palace', caps: 22, goals: 2, ast: 4, debut: '25/03/2022', photo: 'images/players/tsdb_daniel_munoz.jpg', role: 'Titulaire', bio: 'Latéral droit de Crystal Palace.' },
      { id: 'co3', name: 'Davinson SÁNCHEZ', pos: 'Défenseur', n: 4, age: 28, born: '12/06/1996', h: '1m87', club: 'Galatasaray', caps: 62, goals: 4, ast: 2, debut: '11/11/2016', photo: 'images/players/566102.webp', role: 'Titulaire', bio: 'Défenseur central de Galatasaray.' },
      { id: 'co4', name: 'Yerry MINA', pos: 'Défenseur', n: 13, age: 29, born: '23/09/1994', h: '1m95', club: 'Fiorentina', caps: 52, goals: 8, ast: 2, debut: '11/11/2016', photo: 'images/players/360396.webp', role: 'Titulaire', bio: 'Défenseur central de la Fiorentina.' },
      { id: 'co5', name: 'Johan MOJICA', pos: 'Défenseur', n: 3, age: 32, born: '21/02/1992', h: '1m78', club: 'Girona', caps: 32, goals: 1, ast: 4, debut: '14/11/2014', photo: 'images/players/tsdb_johan_mojica.jpg', role: 'Titulaire', bio: 'Latéral gauche de Girona.' },
      { id: 'co6', name: 'Wilmar BARRIOS', pos: 'Milieu', n: 5, age: 30, born: '16/10/1993', h: '1m78', club: 'Zenit', caps: 52, goals: 2, ast: 4, debut: '11/11/2016', photo: 'images/players/309652.webp', role: 'Titulaire', bio: 'Milieu défensif du Zenit.' },
      { id: 'co7', name: 'Mateus URIBE', pos: 'Milieu', n: 8, age: 33, born: '21/03/1991', h: '1m78', club: 'Porto', caps: 52, goals: 8, ast: 6, debut: '14/11/2014', photo: 'images/players/tsdb_mateus_uribe.jpg', role: 'Titulaire', bio: 'Milieu de Porto.' },
      { id: 'co8', name: 'James RODRÍGUEZ', pos: 'Milieu', n: 10, age: 32, born: '12/07/1991', h: '1m80', club: 'Rayo Vallecano', caps: 102, goals: 28, ast: 38, debut: '03/03/2011', photo: 'images/players/tsdb_james_rodriguez.jpg', role: 'Titulaire', bio: 'Légende de la Colombie, Soulier d\'Or du Mondial 2014.' },
      { id: 'co9', name: 'Luis DÍAZ', pos: 'Attaquant', n: 7, age: 27, born: '13/01/1997', h: '1m80', club: 'Liverpool FC', caps: 52, goals: 18, ast: 12, debut: '25/03/2021', photo: 'images/players/tsdb_luis_diaz.jpg', role: 'Titulaire', bio: 'Ailier de Liverpool, vitesse et technique.' },
      { id: 'co10', name: 'Jhon CÓRDOBA', pos: 'Attaquant', n: 9, age: 30, born: '11/05/1993', h: '1m88', club: 'Krasnodar', caps: 22, goals: 8, ast: 4, debut: '25/03/2021', photo: 'images/players/281253.webp', role: 'Titulaire', bio: 'Attaquant de Krasnodar.' },
      { id: 'co11', name: 'Rafael SANTOS BORRÉ', pos: 'Attaquant', n: 11, age: 28, born: '15/09/1995', h: '1m77', club: 'Eintracht', caps: 32, goals: 10, ast: 6, debut: '25/03/2021', photo: 'images/players/tsdb_rafael_santos_borre.jpg', role: 'Titulaire', bio: 'Attaquant d\'Eintracht Francfort.' },
      { id: 'cam23', name: 'Camilo VARGAS', pos: 'Gardien', n: 12, age: 35, born: '01/01/1989', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/125787.webp', role: 'Titulaire', bio: 'Gardien de l\'équipe Colombie.' },
      { id: 'álv24', name: 'Álvaro MONTERO', pos: 'Gardien', n: 22, age: 29, born: '01/01/1995', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/926238.webp', role: 'Remplaçant', bio: 'Gardien de l\'équipe Colombie.' },
      { id: 'car25', name: 'Carlos CUESTA', pos: 'Défenseur', n: 2, age: 25, born: '01/01/1999', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_carlos_cuesta.jpg', role: 'Titulaire', bio: 'Défenseur de l\'équipe Colombie.' },
      { id: 'jho26', name: 'Jhon LUCUMÍ', pos: 'Défenseur', n: 3, age: 25, born: '01/01/1999', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_jhon_lucumi.jpg', role: 'Titulaire', bio: 'Défenseur de l\'équipe Colombie.' },
      { id: 'yer27', name: 'Yerry MINA', pos: 'Défenseur', n: 13, age: 29, born: '01/01/1995', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/360396.webp', role: 'Titulaire', bio: 'Défenseur de l\'équipe Colombie.' },
      { id: 'mat28', name: 'Mateus URIBE', pos: 'Milieu', n: 15, age: 33, born: '01/01/1991', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_mateus_uribe.jpg', role: 'Titulaire', bio: 'Milieu de l\'équipe Colombie.' },
      { id: 'kev29', name: 'Kevin CASTAÑO', pos: 'Milieu', n: 5, age: 23, born: '01/01/2001', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_kevin_castano.jpg', role: 'Titulaire', bio: 'Milieu de l\'équipe Colombie.' },
      { id: 'jor30', name: 'Jorge CARRASCAL', pos: 'Milieu', n: 8, age: 26, born: '01/01/1998', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/590392.webp', role: 'Titulaire', bio: 'Milieu de l\'équipe Colombie.' },
      { id: 'jho31', name: 'Jhon ARIAS', pos: 'Milieu', n: 11, age: 26, born: '01/01/1998', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_jhon_arias.jpg', role: 'Remplaçant', bio: 'Milieu de l\'équipe Colombie.' },
      { id: 'lui32', name: 'Luis SISTERRA', pos: 'Attaquant', n: 18, age: 25, born: '01/01/1999', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'https://api.dicebear.com/7.x/initials/svg?seed=Luis%20SISTERRA&backgroundColor=fcd116&fontSize=38&fontWeight=700&size=200', role: 'Titulaire', bio: 'Attaquant de l\'équipe Colombie.' },
      { id: 'jho33', name: 'Jhon DURÁN', pos: 'Attaquant', n: 14, age: 20, born: '01/01/2004', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/974577.webp', role: 'Titulaire', bio: 'Attaquant de l\'équipe Colombie.' },
      { id: 'raf34', name: 'Rafael BORRÉ', pos: 'Attaquant', n: 19, age: 28, born: '01/01/1996', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_rafael_borre.jpg', role: 'Titulaire', bio: 'Attaquant de l\'équipe Colombie.' }
    ]
  },
  'Uruguay': {
    coach: 'Marcelo Bielsa', formation: '4-3-3', confederation: 'CONMEBOL', titles: 0,
    players: [
{ id: 'uy1', name: 'Sergio ROCHET', pos: 'Gardien', n: 1, age: 30, born: '07/03/1993', h: '1m90', club: 'Nacional', caps: 22, goals: 0, ast: 0, debut: '07/09/2018', photo: 'images/players/tsdb_sergio_rochet.jpg', role: 'Titulaire', bio: 'Gardien titulaire de la Celeste.' },
      { id: 'uy2', name: 'Nahitan NÁNDEZ', pos: 'Défenseur', n: 2, age: 28, born: '28/12/1995', h: '1m80', club: 'Cagliari', caps: 42, goals: 2, ast: 6, debut: '07/09/2018', photo: 'images/players/589620.webp', role: 'Titulaire', bio: 'Milieu-défenseur de Cagliari.' },
      { id: 'uy3', name: 'José María GIMÉNEZ', pos: 'Défenseur', n: 2, age: 29, born: '20/01/1995', h: '1m85', club: 'Atlético Madrid', caps: 62, goals: 4, ast: 2, debut: '14/11/2014', photo: 'images/players/tsdb_jose_maria_gimenez.jpg', role: 'Titulaire', bio: 'Défenseur central de l\'Atlético Madrid.' },
      { id: 'uy4', name: 'Ronald ARAÚJO', pos: 'Défenseur', n: 4, age: 25, born: '07/03/1999', h: '1m88', club: 'FC Barcelone', caps: 32, goals: 3, ast: 1, debut: '07/09/2021', photo: 'images/players/925097.webp', role: 'Titulaire', bio: 'Défenseur central du FC Barcelone.' },
      { id: 'uy5', name: 'Mathías OLIVERA', pos: 'Défenseur', n: 3, age: 26, born: '31/10/1997', h: '1m82', club: 'Napoli', caps: 28, goals: 1, ast: 4, debut: '07/09/2021', photo: 'images/players/805078.webp', role: 'Titulaire', bio: 'Latéral gauche de Napoli.' },
      { id: 'uy6', name: 'Lucas TORREIRA', pos: 'Milieu', n: 6, age: 28, born: '11/02/1996', h: '1m68', club: 'Galatasaray', caps: 52, goals: 4, ast: 6, debut: '07/09/2018', photo: 'images/players/754794.webp', role: 'Titulaire', bio: 'Milieu défensif de Galatasaray.' },
      { id: 'uy7', name: 'Rodrigo BENTANCUR', pos: 'Milieu', n: 8, age: 26, born: '25/06/1997', h: '1m87', club: 'Tottenham', caps: 52, goals: 4, ast: 8, debut: '07/09/2018', photo: 'images/players/791190.webp', role: 'Titulaire', bio: 'Milieu de Tottenham.' },
      { id: 'uy8', name: 'Federico VALVERDE', pos: 'Milieu', n: 14, age: 25, born: '22/07/1998', h: '1m82', club: 'Real Madrid', caps: 52, goals: 8, ast: 10, debut: '07/09/2018', photo: 'images/players/tsdb_federico_valverde.jpg', role: 'Titulaire', bio: 'Milieu du Real Madrid, box-to-box de classe mondiale.' },
      { id: 'uy9', name: 'Luis SUÁREZ', pos: 'Attaquant', n: 9, age: 37, born: '24/01/1987', h: '1m82', club: 'Inter Miami', caps: 142, goals: 68, ast: 32, debut: '07/02/2007', photo: 'images/players/tsdb_luis_suarez.jpg', role: 'Titulaire', bio: 'Légende de l\'Uruguay, 68 buts en 142 sélections.' },
      { id: 'uy10', name: 'Darwin NÚÑEZ', pos: 'Attaquant', n: 11, age: 24, born: '24/06/2000', h: '1m87', club: 'Liverpool FC', caps: 38, goals: 18, ast: 8, debut: '07/09/2021', photo: 'images/players/tsdb_darwin_nunez.jpg', role: 'Titulaire', bio: 'Attaquant de Liverpool, puissance et vitesse.' },
      { id: 'uy11', name: 'Facundo PELLISTRI', pos: 'Attaquant', n: 7, age: 22, born: '20/12/2001', h: '1m74', club: 'Man. United', caps: 22, goals: 4, ast: 6, debut: '07/09/2021', photo: 'images/players/989803.webp', role: 'Titulaire', bio: 'Ailier de Manchester United.' },
      { id: 'ser23', name: 'Sergio ROCHET', pos: 'Gardien', n: 1, age: 31, born: '01/01/1993', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_sergio_rochet.jpg', role: 'Titulaire', bio: 'Gardien de l\'équipe Uruguay.' },
      { id: 'fer24', name: 'Fernando MUSLERA', pos: 'Gardien', n: 12, age: 37, born: '01/01/1987', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/28381.webp', role: 'Remplaçant', bio: 'Gardien de l\'équipe Uruguay.' },
      { id: 'jos25', name: 'José GIMÉNEZ', pos: 'Défenseur', n: 2, age: 29, born: '01/01/1995', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_jose_gimenez.jpg', role: 'Titulaire', bio: 'Défenseur de l\'équipe Uruguay.' },
      { id: 'seb26', name: 'Sebastián COATES', pos: 'Défenseur', n: 19, age: 33, born: '01/01/1991', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/47443.webp', role: 'Titulaire', bio: 'Défenseur de l\'équipe Uruguay.' },
      { id: 'mat27', name: 'Matías VIÑA', pos: 'Défenseur', n: 17, age: 26, born: '01/01/1998', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/875295.webp', role: 'Titulaire', bio: 'Défenseur de l\'équipe Uruguay.' },
      { id: 'gui28', name: 'Guillermo VARELA', pos: 'Défenseur', n: 13, age: 31, born: '01/01/1993', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/311456.webp', role: 'Titulaire', bio: 'Défenseur de l\'équipe Uruguay.' },
      { id: 'luc29', name: 'Lucas TORREIRA', pos: 'Milieu', n: 14, age: 28, born: '01/01/1996', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/754794.webp', role: 'Titulaire', bio: 'Milieu de l\'équipe Uruguay.' },
      { id: 'man30', name: 'Manuel UGARTE', pos: 'Milieu', n: 25, age: 23, born: '01/01/2001', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_manuel_ugarte.jpg', role: 'Titulaire', bio: 'Milieu de l\'équipe Uruguay.' },
      { id: 'nic31', name: 'Nicolás DE LA CRUZ', pos: 'Milieu', n: 7, age: 26, born: '01/01/1998', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/877513.webp', role: 'Titulaire', bio: 'Milieu de l\'équipe Uruguay.' },
      { id: 'fac32', name: 'Facundo PELLISTRI', pos: 'Attaquant', n: 8, age: 22, born: '01/01/2002', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/989803.webp', role: 'Titulaire', bio: 'Attaquant de l\'équipe Uruguay.' },
      { id: 'gio33', name: 'Giorgian DE ARRASCAETA', pos: 'Milieu', n: 10, age: 30, born: '01/01/1994', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/333587.webp', role: 'Remplaçant', bio: 'Milieu de l\'équipe Uruguay.' },
      { id: 'max34', name: 'Maxi GÓMEZ', pos: 'Attaquant', n: 18, age: 27, born: '01/01/1997', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_maxi_gomez.jpg', role: 'Titulaire', bio: 'Attaquant de l\'équipe Uruguay.' }
    ]
  },
  'États-Unis': {
    coach: 'Gregg Berhalter', formation: '4-3-3', confederation: 'CONCACAF', titles: 0,
    players: [
{ id: 'us1', name: 'Matt TURNER', pos: 'Gardien', n: 1, age: 29, born: '24/06/1994', h: '1m93', club: 'Crystal Palace', caps: 32, goals: 0, ast: 0, debut: '09/02/2021', photo: 'images/players/833943.webp', role: 'Titulaire', bio: 'Gardien titulaire des États-Unis.' },
      { id: 'us2', name: 'Sergiño DEST', pos: 'Défenseur', n: 2, age: 23, born: '03/11/2000', h: '1m78', club: 'PSV', caps: 32, goals: 2, ast: 4, debut: '12/11/2020', photo: 'images/players/906021.webp', role: 'Titulaire', bio: 'Latéral droit du PSV.' },
      { id: 'us3', name: 'Chris RICHARDS', pos: 'Défenseur', n: 4, age: 24, born: '28/03/2000', h: '1m87', club: 'Crystal Palace', caps: 22, goals: 1, ast: 0, debut: '12/11/2020', photo: 'images/players/tsdb_chris_richards.jpg', role: 'Titulaire', bio: 'Défenseur central de Crystal Palace.' },
      { id: 'us4', name: 'Tim REAM', pos: 'Défenseur', n: 13, age: 36, born: '05/10/1987', h: '1m85', club: 'Charlotte FC', caps: 42, goals: 1, ast: 1, debut: '29/01/2011', photo: 'images/players/118179.webp', role: 'Titulaire', bio: 'Défenseur expérimenté de Charlotte FC.' },
      { id: 'us5', name: 'Antonee ROBINSON', pos: 'Défenseur', n: 5, age: 27, born: '08/08/1997', h: '1m83', club: 'Fulham', caps: 42, goals: 2, ast: 5, debut: '12/11/2020', photo: 'images/players/tsdb_antonee_robinson.jpg', role: 'Titulaire', bio: 'Latéral gauche de Fulham, moteur offensif.' },
      { id: 'us6', name: 'Joe SCALLY', pos: 'Défenseur', n: 3, age: 21, born: '31/12/2002', h: '1m80', club: 'Borussia M\'gladbach', caps: 12, goals: 0, ast: 1, debut: '25/03/2023', photo: 'images/players/tsdb_joe_scally.jpg', role: 'Remplaçant', bio: 'Jeune défenseur de Bundesliga.' },
      { id: 'us7', name: 'Tyler ADAMS', pos: 'Milieu', n: 4, age: 25, born: '14/02/1999', h: '1m74', club: 'Bournemouth', caps: 52, goals: 2, ast: 4, debut: '31/01/2017', photo: 'images/players/1514870.webp', role: 'Titulaire', bio: 'Capitaine des États-Unis, milieu défensif de Bournemouth.' },
      { id: 'us8', name: 'Weston McKENNIE', pos: 'Milieu', n: 8, age: 26, born: '28/08/1998', h: '1m84', club: 'Juventus', caps: 52, goals: 8, ast: 6, debut: '23/03/2017', photo: 'images/players/881931.webp', role: 'Titulaire', bio: 'Milieu box-to-box de la Juventus.' },
      { id: 'us9', name: 'Yunus MUSAH', pos: 'Milieu', n: 6, age: 21, born: '29/11/2002', h: '1m78', club: 'AC Milan', caps: 38, goals: 2, ast: 4, debut: '12/11/2020', photo: 'images/players/tsdb_yunus_musah.jpg', role: 'Titulaire', bio: 'Milieu dynamique de l\'AC Milan.' },
      { id: 'us10', name: 'Gio REYNA', pos: 'Milieu', n: 7, age: 21, born: '13/11/2002', h: '1m80', club: 'Nottingham Forest', caps: 28, goals: 4, ast: 6, debut: '12/11/2020', photo: 'images/players/989056.webp', role: 'Remplaçant', bio: 'Fils de Claudio Reyna, talent offensif de Nottingham Forest.' },
      { id: 'us11', name: 'Brenden AARONSON', pos: 'Milieu', n: 11, age: 23, born: '22/10/2000', h: '1m77', club: 'Leeds United', caps: 38, goals: 6, ast: 8, debut: '12/11/2020', photo: 'images/players/973431.webp', role: 'Remplaçant', bio: 'Milieu offensif de Leeds United.' },
      { id: 'us12', name: 'Christian PULISIC', pos: 'Attaquant', n: 10, age: 25, born: '18/09/1998', h: '1m77', club: 'AC Milan', caps: 72, goals: 28, ast: 18, debut: '29/01/2016', photo: 'images/players/tsdb_christian_pulisic.jpg', role: 'Titulaire', bio: 'Capitaine et star des États-Unis, ailier de l\'AC Milan.' },
      { id: 'us13', name: 'Ricardo PEPI', pos: 'Attaquant', n: 9, age: 21, born: '09/01/2003', h: '1m87', club: 'PSV', caps: 28, goals: 12, ast: 4, debut: '02/09/2021', photo: 'images/players/986395.webp', role: 'Titulaire', bio: 'Avant-centre du PSV, buteur prolifique.' },
      { id: 'us14', name: 'Josh SARGENT', pos: 'Attaquant', n: 19, age: 24, born: '20/02/2000', h: '1m85', club: 'Norwich City', caps: 32, goals: 10, ast: 4, debut: '12/11/2020', photo: 'images/players/880796.webp', role: 'Titulaire', bio: 'Attaquant de Norwich City.' },
      { id: 'us15', name: 'Folarin BALOGUN', pos: 'Attaquant', n: 17, age: 23, born: '03/07/2001', h: '1m78', club: 'Monaco', caps: 12, goals: 4, ast: 2, debut: '25/03/2023', photo: 'images/players/934237.webp', role: 'Remplaçant', bio: 'Attaquant de Monaco, choix américain.' },
      { id: 'us16', name: 'Jordan MORRIS', pos: 'Attaquant', n: 13, age: 29, born: '26/10/1994', h: '1m83', club: 'Seattle Sounders', caps: 52, goals: 14, ast: 8, debut: '29/01/2016', photo: 'images/players/tsdb_jordan_morris.jpg', role: 'Remplaçant', bio: 'Ailier des Seattle Sounders, expérimenté.' },
      { id: 'eth23', name: 'Ethan HORVATH', pos: 'Gardien', n: 12, age: 29, born: '01/01/1995', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_ethan_horvath.jpg', role: 'Titulaire', bio: 'Gardien de l\'équipe États-Unis.' },
      { id: 'sea24', name: 'Sean JOHNSON', pos: 'Gardien', n: 25, age: 35, born: '01/01/1989', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/111108.webp', role: 'Remplaçant', bio: 'Gardien de l\'équipe États-Unis.' },
      { id: 'cam25', name: 'Cameron CARTER-VICKERS', pos: 'Défenseur', n: 20, age: 26, born: '01/01/1998', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/358084.webp', role: 'Titulaire', bio: 'Défenseur de l\'équipe États-Unis.' },
      { id: 'aar26', name: 'Aaron LONG', pos: 'Défenseur', n: 15, age: 31, born: '01/01/1993', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_aaron_long.jpg', role: 'Titulaire', bio: 'Défenseur de l\'équipe États-Unis.' },
      { id: 'kel27', name: 'Kellyn ACOSTA', pos: 'Milieu', n: 23, age: 28, born: '01/01/1996', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/155950.webp', role: 'Titulaire', bio: 'Milieu de l\'équipe États-Unis.' },
      { id: 'cri28', name: 'Cristian ROLDAN', pos: 'Milieu', n: 17, age: 29, born: '01/01/1995', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_cristian_roldan.jpg', role: 'Titulaire', bio: 'Milieu de l\'équipe États-Unis.' },
      { id: 'jor29', name: 'Jordan MORRIS', pos: 'Attaquant', n: 16, age: 29, born: '01/01/1995', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_jordan_morris.jpg', role: 'Titulaire', bio: 'Attaquant de l\'équipe États-Unis.' }
    ]
  },
  'Mexique': {
coach: 'Javier Aguirre', formation: '4-3-3', confederation: 'CONCACAF', titles: 0,
    players: [
      { id: 'mx1', name: 'Luis MALAGÓN', pos: 'Gardien', n: 1, age: 27, born: '02/03/1997', h: '1m82', club: 'Club América', caps: 15, goals: 0, ast: 0, debut: '2021', photo: 'images/players/tsdb_luis_malagon.jpg', role: 'Titulaire', bio: 'Nouveau numéro 1 du Mexique.' },
      { id: 'mx2', name: 'César MONTES', pos: 'Défenseur', n: 3, age: 27, born: '24/02/1997', h: '1m91', club: 'Lokomotiv Moscou', caps: 48, goals: 1, ast: 0, debut: '2019', photo: 'images/players/818406.webp', role: 'Titulaire', bio: 'Roc défensif évoluant en Russie.' },
      { id: 'mx3', name: 'Johan VÁSQUEZ', pos: 'Défenseur', n: 5, age: 25, born: '22/10/1998', h: '1m87', club: 'Genoa', caps: 28, goals: 1, ast: 0, debut: '2021', photo: 'images/players/889785.webp', role: 'Titulaire', bio: 'Défenseur central établi en Serie A.' },
      { id: 'mx4', name: 'Jorge SÁNCHEZ', pos: 'Défenseur', n: 2, age: 26, born: '10/12/1997', h: '1m78', club: 'Cruz Azul', caps: 45, goals: 1, ast: 4, debut: '2019', photo: 'images/players/832868.webp', role: 'Titulaire', bio: 'Latéral droit d\'expérience.' },
      { id: 'mx5', name: 'Jesús GALLARDO', pos: 'Défenseur', n: 23, age: 30, born: '15/08/1994', h: '1m76', club: 'Toluca', caps: 100, goals: 2, ast: 10, debut: '2016', photo: 'images/players/770253.webp', role: 'Titulaire', bio: 'Centenaire en sélection.' },
      { id: 'mx6', name: 'Edson ÁLVAREZ', pos: 'Milieu', n: 4, age: 26, born: '24/10/1997', h: '1m87', club: 'West Ham', caps: 80, goals: 5, ast: 4, debut: '2017', photo: 'images/players/847151.webp', role: 'Titulaire', bio: 'Le Machín, patron du milieu.' },
      { id: 'mx7', name: 'Luis CHÁVEZ', pos: 'Milieu', n: 18, age: 28, born: '15/01/1996', h: '1m78', club: 'Dynamo Moscou', caps: 35, goals: 4, ast: 5, debut: '2022', photo: 'https://img.sofascore.com/api/v1/player/1638685/image', role: 'Titulaire', bio: 'Spécialiste des coups de pied arrêtés.' },
      { id: 'mx8', name: 'Orbelín PINEDA', pos: 'Milieu', n: 17, age: 28, born: '24/03/1996', h: '1m69', club: 'AEK Athènes', caps: 70, goals: 10, ast: 12, debut: '2016', photo: 'images/players/850404.webp', role: 'Titulaire', bio: 'Milieu créatif polyvalent.' },
      { id: 'mx9', name: 'Hirving LOZANO', pos: 'Attaquant', n: 22, age: 29, born: '30/07/1995', h: '1m75', club: 'PSV', caps: 74, goals: 18, ast: 15, debut: '2016', photo: 'images/players/tsdb_hirving_lozano.jpg', role: 'Titulaire', bio: 'L\'ailier électrique du PSV.' },
      { id: 'mx10', name: 'Santiago GIMÉNEZ', pos: 'Attaquant', n: 11, age: 23, born: '18/04/2001', h: '1m82', club: 'Feyenoord', caps: 32, goals: 8, ast: 4, debut: '2021', photo: 'images/players/tsdb_santiago_gimenez.jpg', role: 'Titulaire', bio: 'Le buteur providentiel du Mexique.' },
      { id: 'mx11', name: 'Raúl JIMÉNEZ', pos: 'Attaquant', n: 9, age: 33, born: '05/05/1991', h: '1m88', club: 'Fulham', caps: 106, goals: 34, ast: 15, debut: '2013', photo: 'images/players/tsdb_raul_jimenez.jpg', role: 'Titulaire', bio: 'L\'expert de la Premier League.' },
      { id: 'mx12', name: 'Orbelín PINEDA', pos: 'Milieu', n: 17, age: 28, born: '24/03/1996', h: '1m69', club: 'AEK Athènes', caps: 68, goals: 10, ast: 12, debut: '2016', photo: 'images/players/850404.webp', role: 'Remplaçant', bio: 'Milieu créatif et dynamique.' },
      { id: 'mx13', name: 'Carlos RODRÍGUEZ', pos: 'Milieu', n: 8, age: 27, born: '03/01/1997', h: '1m74', club: 'Cruz Azul', caps: 52, goals: 0, ast: 6, debut: '2019', photo: 'images/players/845849.webp', role: 'Remplaçant', bio: 'Milieu technique.' },
      { id: 'mx14', name: 'Marcel RUIZ', pos: 'Milieu', n: 14, age: 23, born: '26/10/2000', h: '1m79', club: 'Toluca', caps: 5, goals: 0, ast: 1, debut: '2023', photo: 'images/players/942167.webp', role: 'Remplaçant', bio: 'Grand espoir au milieu.' },
      { id: 'mx15', name: 'Roberto ALVARADO', pos: 'Milieu', n: 25, age: 25, born: '07/09/1998', h: '1m76', club: 'Chivas', caps: 45, goals: 5, ast: 8, debut: '2018', photo: 'images/players/tsdb_roberto_alvarado.jpg', role: 'Remplaçant', bio: 'Polyvalent sur les côtés.' },
      { id: 'mx16', name: 'Santiago GIMÉNEZ', pos: 'Attaquant', n: 11, age: 23, born: '18/04/2001', h: '1m82', club: 'Feyenoord', caps: 30, goals: 8, ast: 4, debut: '2021', photo: 'images/players/tsdb_santiago_gimenez.jpg', role: 'Remplaçant', bio: 'Le grand espoir de l\'attaque mexicaine.' },
      { id: 'mx17', name: 'Raúl JIMÉNEZ', pos: 'Attaquant', n: 9, age: 33, born: '05/05/1991', h: '1m88', club: 'Fulham', caps: 105, goals: 33, ast: 14, debut: '2013', photo: 'images/players/tsdb_raul_jimenez.jpg', role: 'Remplaçant', bio: 'Attaquant expérimenté de Premier League.' },
      { id: 'mx18', name: 'Hirving LOZANO', pos: 'Attaquant', n: 22, age: 28, born: '30/07/1995', h: '1m74', club: 'San Diego FC', caps: 70, goals: 18, ast: 15, debut: '2016', photo: 'images/players/tsdb_hirving_lozano.jpg', role: 'Remplaçant', bio: 'Le Chucky, danger permanent sur l\'aile.' },
      { id: 'mx19', name: 'Julián QUIÑONES', pos: 'Attaquant', n: 33, age: 27, born: '24/03/1997', h: '1m80', club: 'Al-Qadsiah', caps: 10, goals: 2, ast: 1, debut: '2023', photo: 'images/players/tsdb_julian_quinones.jpg', role: 'Remplaçant', bio: 'Attaquant puissant et rapide.' },
      { id: 'mx20', name: 'César HUERTA', pos: 'Attaquant', n: 12, age: 23, born: '03/12/2000', h: '1m74', club: 'Pumas UNAM', caps: 12, goals: 2, ast: 2, debut: '2023', photo: 'images/players/tsdb_cesar_huerta.jpg', role: 'Remplaçant', bio: 'Le Chino, nouvelle sensation.' },
      { id: 'mx21', name: 'Alexis VEGA', pos: 'Attaquant', n: 10, age: 26, born: '25/11/1997', h: '1m73', club: 'Toluca', caps: 30, goals: 6, ast: 5, debut: '2019', photo: 'images/players/815637.webp', role: 'Remplaçant', bio: 'Attaquant technique et finisseur.' },
      { id: 'mx22', name: 'Uriel ANTUNA', pos: 'Attaquant', n: 15, age: 26, born: '21/08/1997', h: '1m74', club: 'Cruz Azul', caps: 60, goals: 13, ast: 10, debut: '2019', photo: 'images/players/843198.webp', role: 'Remplaçant', bio: 'Ailier de débordement.' },
      { id: 'mx23', name: 'Henry MARTÍN', pos: 'Attaquant', n: 21, age: 31, born: '18/11/1992', h: '1m78', club: 'América', caps: 45, goals: 9, ast: 3, debut: '2015', photo: 'images/players/755408.webp', role: 'Remplaçant', bio: 'Buteur opportuniste de l\'América.' }
    ]
  },
  'Équateur': {
coach: 'Sebastián Beccacece', formation: '4-3-3', confederation: 'CONMEBOL', titles: 0,
    players: [
      { id: 'ec1', name: 'Hernán GALÍNDEZ', pos: 'Gardien', n: 1, age: 39, born: '30/03/1987', h: '1m89', club: 'Huracán', caps: 40, goals: 0, ast: 0, debut: '2021', photo: 'images/players/tsdb_hernan_galindez.jpg', role: 'Titulaire', bio: 'Gardien titulaire d\'expérience.' },
      { id: 'ec2', name: 'Moisés RAMÍREZ', pos: 'Gardien', n: 12, age: 25, born: '09/09/2000', h: '1m86', club: 'Indep. del Valle', caps: 6, goals: 0, ast: 0, debut: '2021', photo: 'images/players/923237.webp', role: 'Remplaçant', bio: 'Gardien moderne de l\'IDV.' },
      { id: 'ec3', name: 'Gonzalo VALLE', pos: 'Gardien', n: 22, age: 28, born: '28/02/1996', h: '1m85', club: 'LDU Quito', caps: 1, goals: 0, ast: 0, debut: '2023', photo: 'images/players/925484.webp', role: 'Remplaçant', bio: 'Doublure fiable.' },
      { id: 'ec4', name: 'Piero HINCAPIÉ', pos: 'Défenseur', n: 3, age: 24, born: '09/01/2002', h: '1m84', club: 'Luxembourg (On Loan)', caps: 40, goals: 3, ast: 1, debut: '2021', photo: 'images/players/1002837.webp', role: 'Titulaire', bio: 'Un des défenseurs les plus prometteurs d\'Europe.' },
      { id: 'ec5', name: 'Willian PACHO', pos: 'Défenseur', n: 6, age: 24, born: '16/10/2001', h: '1m87', club: 'PSG', caps: 18, goals: 2, ast: 0, debut: '2023', photo: 'images/players/979480.webp', role: 'Titulaire', bio: 'La nouvelle tour de contrôle du PSG.' },
      { id: 'ec6', name: 'Pervis ESTUPIÑÁN', pos: 'Défenseur', n: 7, age: 28, born: '21/01/1998', h: '1m75', club: 'Brighton', caps: 40, goals: 4, ast: 6, debut: '2019', photo: 'images/players/tsdb_pervis_estupinan.jpg', role: 'Titulaire', bio: 'Moteur infatigable sur le côté gauche.' },
      { id: 'ec7', name: 'Angelo PRECIADO', pos: 'Défenseur', n: 17, age: 28, born: '18/02/1998', h: '1m74', club: 'Sparta Prague', caps: 40, goals: 1, ast: 3, debut: '2018', photo: 'images/players/tsdb_angelo_preciado.jpg', role: 'Titulaire', bio: 'Latéral droit porté vers l\'offensive.' },
      { id: 'ec8', name: 'Félix TORRES', pos: 'Défenseur', n: 2, age: 29, born: '11/01/1997', h: '1m87', club: 'Corinthians', caps: 35, goals: 5, ast: 1, debut: '2019', photo: 'images/players/tsdb_felix_torres.jpg', role: 'Remplaçant', bio: 'Défenseur axial de Corinthians.' },
      { id: 'ec9', name: 'Robert ARBOLEDA', pos: 'Défenseur', n: 4, age: 34, born: '22/10/1991', h: '1m89', club: 'São Paulo', caps: 39, goals: 2, ast: 1, debut: '2016', photo: 'images/players/tsdb_robert_arboleda.jpg', role: 'Remplaçant', bio: 'Le doyen de la défense.' },
      { id: 'ec10', name: 'Cristian RAMÍREZ', pos: 'Défenseur', n: 19, age: 31, born: '12/08/1994', h: '1m74', club: 'Ferencváros', caps: 25, goals: 1, ast: 3, debut: '2013', photo: 'https://img.sofascore.com/api/v1/player/1459658/image', role: 'Remplaçant', bio: 'Latéral gauche polyvalent.' },
      { id: 'ec11', name: 'Moisés CAICEDO', pos: 'Milieu', n: 23, age: 24, born: '02/11/2001', h: '1m78', club: 'Chelsea FC', caps: 45, goals: 3, ast: 5, debut: '2020', photo: 'images/players/tsdb_moises_caicedo.jpg', role: 'Titulaire', bio: 'Le poumon de l\'équipe au milieu.' },
      { id: 'ec12', name: 'Kendry PÁEZ', pos: 'Milieu', n: 10, age: 19, born: '04/05/2007', h: '1m77', club: 'Indep. del Valle', caps: 15, goals: 2, ast: 4, debut: '2023', photo: 'images/players/1464025.webp', role: 'Titulaire', bio: 'L\'enfant prodige, futur Chelsea.' },
      { id: 'ec13', name: 'Alan FRANCO', pos: 'Milieu', n: 21, age: 27, born: '21/08/1998', h: '1m73', club: 'Atlético Mineiro', caps: 35, goals: 2, ast: 4, debut: '2018', photo: 'images/players/tsdb_alan_franco.jpg', role: 'Titulaire', bio: 'Milieu travailleur accompli.' },
      { id: 'ec14', name: 'Jordy ALCÍVAR', pos: 'Milieu', n: 8, age: 26, born: '05/08/1999', h: '1m78', club: 'Indep. del Valle', caps: 5, goals: 0, ast: 1, debut: '2021', photo: 'images/players/925740.webp', role: 'Remplaçant', bio: 'Spécialiste de la relance.' },
      { id: 'ec15', name: 'Pedro VITE', pos: 'Milieu', n: 14, age: 24, born: '23/02/2002', h: '1m70', club: 'Vancouver', caps: 5, goals: 1, ast: 1, debut: '2023', photo: 'images/players/1002524.webp', role: 'Remplaçant', bio: 'Meneur de jeu en MLS.' },
      { id: 'ec16', name: 'Jhegson MÉNDEZ', pos: 'Milieu', n: 20, age: 29, born: '26/04/1997', h: '1m74', club: 'Elche (On Loan)', caps: 36, goals: 0, ast: 1, debut: '2018', photo: 'images/players/590150.webp', role: 'Remplaçant', bio: 'Sentinelle expérimentée.' },
      { id: 'ec17', name: 'Enner VALENCIA', pos: 'Attaquant', n: 13, age: 36, born: '04/11/1989', h: '1m77', club: 'Internacional', caps: 90, goals: 41, ast: 12, debut: '2012', photo: 'images/players/tsdb_enner_valencia.jpg', role: 'Titulaire', bio: 'Capitaine légendaire.' },
      { id: 'ec18', name: 'Gonzalo PLATA', pos: 'Attaquant', n: 19, age: 25, born: '01/11/2000', h: '1m78', club: 'Flamengo', caps: 38, goals: 6, ast: 8, debut: '2019', photo: 'images/players/937937.webp', role: 'Titulaire', bio: 'Dribbleur de classe mondiale.' },
      { id: 'ec19', name: 'John YEBOAH', pos: 'Attaquant', n: 14, age: 26, born: '23/06/2000', h: '1m70', club: 'Venezia', caps: 5, goals: 2, ast: 1, debut: '2024', photo: 'images/players/879802.webp', role: 'Titulaire', bio: 'La sensation de Serie A.' },
      { id: 'ec20', name: 'Kevin RODRÍGUEZ', pos: 'Attaquant', n: 11, age: 26, born: '04/03/2000', h: '1m90', club: 'Union SG', caps: 18, goals: 2, ast: 1, debut: '2022', photo: 'images/players/1431770.webp', role: 'Remplaçant', bio: 'Attaquant longiligne et puissant.' },
      { id: 'ec21', name: 'Alan MINDA', pos: 'Attaquant', n: 27, age: 23, born: '14/05/2003', h: '1m71', club: 'Cercle Brugge', caps: 5, goals: 1, ast: 2, debut: '2024', photo: 'images/players/tsdb_alan_minda.jpg', role: 'Remplaçant', bio: 'Ailier supersonique.' },
      { id: 'ec22', name: 'Leonardo CAMPANA', pos: 'Attaquant', n: 9, age: 25, born: '24/07/2000', h: '1m87', club: 'Inter Miami', caps: 15, goals: 0, ast: 2, debut: '2019', photo: 'images/players/973557.webp', role: 'Remplaçant', bio: 'Buteur à l\'Inter Miami.' },
      { id: 'ec23', name: 'Jeremy SARMIENTO', pos: 'Attaquant', n: 16, age: 24, born: '16/06/2002', h: '1m78', club: 'Burnley', caps: 22, goals: 2, ast: 2, debut: '2021', photo: 'images/players/983816.webp', role: 'Remplaçant', bio: 'Talent technique formé à l\'anglaise.' }
    ]
  },
  'Corée du Sud': {
coach: 'Hong Myung-bo', formation: '4-2-3-1', confederation: 'AFC', titles: 0,
    players: [
      { id: 'kr1', name: 'JO Hyeon-woo', pos: 'Gardien', n: 21, age: 34, born: '25/09/1991', h: '1m89', club: 'Ulsan HD', caps: 35, goals: 0, ast: 0, debut: '2017', photo: 'images/players/tsdb_jo_hyeon_woo.jpg', role: 'Titulaire', bio: 'Gardien agile aux réflexes impressionnants.' },
      { id: 'kr2', name: 'KIM Seung-gyu', pos: 'Gardien', n: 1, age: 35, born: '30/09/1990', h: '1m87', club: 'Al-Shabab', caps: 80, goals: 0, ast: 0, debut: '2013', photo: 'images/players/tsdb_kim_seung_gyu.jpg', role: 'Remplaçant', bio: 'Le plus capé des gardiens coréens.' },
      { id: 'kr3', name: 'KIM Min-jae', pos: 'Défenseur', n: 4, age: 29, born: '15/11/1996', h: '1m90', club: 'Bayern Munich', caps: 65, goals: 4, ast: 2, debut: '2017', photo: 'images/players/tsdb_kim_min_jae.jpg', role: 'Titulaire', bio: 'L\'un des meilleurs défenseurs centraux du monde.' },
      { id: 'kr4', name: 'SEOL Young-woo', pos: 'Défenseur', n: 22, age: 27, born: '05/12/1998', h: '1m80', club: 'Crvena Zvezda', caps: 20, goals: 0, ast: 2, debut: '2023', photo: 'images/players/1019333.webp', role: 'Titulaire', bio: 'Latéral droit moderne.' },
      { id: 'kr5', name: 'LEE Tae-seok', pos: 'Défenseur', n: 3, age: 23, born: '20/03/2002', h: '1m77', club: 'FC Seoul', caps: 5, goals: 0, ast: 1, debut: '2025', photo: 'images/players/tsdb_lee_tae_seok.jpg', role: 'Titulaire', bio: 'Nouveau talent sur le côté gauche.' },
      { id: 'kr6', name: 'KIM Joo-seong', pos: 'Défenseur', n: 5, age: 25, born: '12/12/2000', h: '1m86', club: 'FC Seoul', caps: 10, goals: 0, ast: 0, debut: '2022', photo: 'images/players/1119518.webp', role: 'Titulaire', bio: 'Solide pilier de K-League.' },
      { id: 'kr7', name: 'LEE Han-beom', pos: 'Défenseur', n: 15, age: 23, born: '17/06/2002', h: '1m88', club: 'Midtjylland', caps: 5, goals: 0, ast: 0, debut: '2024', photo: 'https://img.sofascore.com/api/v1/player/1002355/image', role: 'Remplaçant', bio: 'Défenseur évoluant au Danemark.' },
      { id: 'kr8', name: 'KIM Moon-hwan', pos: 'Défenseur', n: 2, age: 30, born: '01/08/1995', h: '1m73', club: 'Daejeon', caps: 27, goals: 0, ast: 2, debut: '2018', photo: 'images/players/921263.webp', role: 'Remplaçant', bio: 'Vitesse sur l\'aile droite.' },
      { id: 'kr9', name: 'LEE Myung-jae', pos: 'Défenseur', n: 13, age: 32, born: '04/11/1993', h: '1m80', club: 'Ulsan HD', caps: 8, goals: 0, ast: 1, debut: '2024', photo: 'images/players/tsdb_lee_myung_jae.jpg', role: 'Remplaçant', bio: 'Latéral gauche polyvalent.' },
      { id: 'kr10', name: 'HWANG In-beom', pos: 'Milieu', n: 6, age: 29, born: '20/09/1996', h: '1m77', club: 'Feyenoord', caps: 60, goals: 6, ast: 8, debut: '2018', photo: 'images/players/889689.webp', role: 'Titulaire', bio: 'Le cerveau de l\'équipe au milieu.' },
      { id: 'kr11', name: 'LEE Jae-sung', pos: 'Milieu', n: 10, age: 33, born: '10/08/1992', h: '1m80', club: 'Mainz 05', caps: 90, goals: 11, ast: 15, debut: '2015', photo: 'images/players/tsdb_lee_jae_sung.jpg', role: 'Titulaire', bio: 'L\'expérience de la Bundesliga.' },
      { id: 'kr12', name: 'PARK Yong-woo', pos: 'Milieu', n: 8, age: 32, born: '10/09/1993', h: '1m86', club: 'Al-Ain', caps: 22, goals: 0, ast: 1, debut: '2023', photo: 'images/players/tsdb_park_yong_woo.jpg', role: 'Titulaire', bio: 'Sentinelle physique.' },
      { id: 'kr13', name: 'LEE Kang-in', pos: 'Milieu', n: 18, age: 25, born: '19/02/2001', h: '1m73', club: 'PSG', caps: 35, goals: 10, ast: 12, debut: '2019', photo: 'images/players/tsdb_lee_kang_in.jpg', role: 'Remplaçant', bio: 'La magie du PSG.' },
      { id: 'kr14', name: 'BAEK Seung-ho', pos: 'Milieu', n: 14, age: 29, born: '17/03/1997', h: '1m82', club: 'Birmingham City', caps: 18, goals: 3, ast: 1, debut: '2019', photo: 'images/players/1639357.webp', role: 'Remplaçant', bio: 'Formé à la Masia.' },
      { id: 'kr15', name: 'BAE Jun-ho', pos: 'Milieu', n: 25, age: 22, born: '21/08/2003', h: '1m78', club: 'Stoke City', caps: 5, goals: 1, ast: 2, debut: '2024', photo: 'images/players/1185869.webp', role: 'Remplaçant', bio: 'Grand espoir de Stoke City.' },
      { id: 'kr16', name: 'LEE Dong-kyung', pos: 'Milieu', n: 24, age: 28, born: '20/09/1997', h: '1m75', club: 'Gimcheon', caps: 10, goals: 2, ast: 1, debut: '2019', photo: 'https://img.sofascore.com/api/v1/player/1002355/image', role: 'Remplaçant', bio: 'Gaucher talentueux.' },
      { id: 'kr17', name: 'SON Heung-min', pos: 'Attaquant', n: 7, age: 33, born: '08/07/1992', h: '1m84', club: 'Tottenham', caps: 130, goals: 50, ast: 25, debut: '2010', photo: 'images/players/111505.webp', role: 'Titulaire', bio: 'Roi de Corée et légende de Tottenham.' },
      { id: 'kr18', name: 'HWANG Hee-chan', pos: 'Attaquant', n: 11, age: 30, born: '26/01/1996', h: '1m77', club: 'Wolverhampton', caps: 68, goals: 15, ast: 10, debut: '2016', photo: 'images/players/tsdb_hwang_hee_chan.jpg', role: 'Titulaire', bio: 'Le Taureau de la Premier League.' },
      { id: 'kr19', name: 'OH Hyeon-gyu', pos: 'Attaquant', n: 19, age: 25, born: '12/04/2001', h: '1m85', club: 'Genk', caps: 12, goals: 2, ast: 1, debut: '2022', photo: 'images/players/1010634.webp', role: 'Titulaire', bio: 'Puissance offensive en Belgique.' },
      { id: 'kr20', name: 'CHO Gue-sung', pos: 'Attaquant', n: 9, age: 28, born: '25/01/1998', h: '1m89', club: 'Midtjylland', caps: 40, goals: 10, ast: 2, debut: '2021', photo: 'images/players/1014281.webp', role: 'Remplaçant', bio: 'Tueur devant le but.' },
      { id: 'kr21', name: 'OH Se-hoon', pos: 'Attaquant', n: 20, age: 27, born: '15/01/1999', h: '1m93', club: 'Machida Zelvia', caps: 3, goals: 1, ast: 0, debut: '2024', photo: 'images/players/1459582.webp', role: 'Remplaçant', bio: 'Point d\'appui aérien.' },
      { id: 'kr22', name: 'JUNG Sang-bin', pos: 'Attaquant', n: 27, age: 24, born: '01/04/2002', h: '1m75', club: 'Minnesota Utd', caps: 2, goals: 1, ast: 0, debut: '2021', photo: 'https://img.sofascore.com/api/v1/player/1022225/image', role: 'Remplaçant', bio: 'Vitesse pure en MLS.' },
      { id: 'kr23', name: 'YANG Min-hyeok', pos: 'Attaquant', n: 26, age: 19, born: '16/04/2006', h: '1m76', club: 'Gangwon FC', caps: 2, goals: 0, ast: 1, debut: '2025', photo: 'images/players/tsdb_yang_min_hyeok.jpg', role: 'Remplaçant', bio: 'Futur crack coréen.' }
    ]
  },
  'Afrique du Sud': {
coach: 'Hugo Broos', formation: '4-2-3-1', confederation: 'CAF', titles: 0,
    players: [
      { id: 'za1', name: 'Ronwen WILLIAMS', pos: 'Gardien', n: 1, age: 34, born: '21/01/1992', h: '1m84', club: 'Mamelodi Sundowns', caps: 50, goals: 0, ast: 0, debut: '2014', photo: 'images/players/tsdb_ronwen_williams.jpg', role: 'Titulaire', bio: 'Capitaine et rempart infranchissable.' },
      { id: 'za2', name: 'Ricardo GOSS', pos: 'Gardien', n: 12, age: 31, born: '02/04/1994', h: '1m81', club: 'Suel FC', caps: 5, goals: 0, ast: 0, debut: '2020', photo: 'images/players/966059.webp', role: 'Remplaçant', bio: 'Doublure fiable.' },
      { id: 'za3', name: 'Sipho CHAINE', pos: 'Gardien', n: 22, age: 29, born: '14/12/1996', h: '1m83', club: 'Orlando Pirates', caps: 1, goals: 0, ast: 0, debut: '2023', photo: 'images/players/903610.webp', role: 'Remplaçant', bio: 'Gardien des Pirates.' },
      { id: 'za4', name: 'Khuliso MUDAU', pos: 'Défenseur', n: 2, age: 31, born: '26/04/1995', h: '1m78', club: 'Mamelodi Sundowns', caps: 15, goals: 1, ast: 2, debut: '2021', photo: 'images/players/tsdb_khuliso_mudau.jpg', role: 'Titulaire', bio: 'Latéral droit explosif.' },
      { id: 'za5', name: 'Aubrey MODIBA', pos: 'Défenseur', n: 6, age: 30, born: '22/07/1995', h: '1m70', club: 'Mamelodi Sundowns', caps: 30, goals: 3, ast: 4, debut: '2016', photo: 'images/players/tm_aubrey_modiba.jpg', role: 'Titulaire', bio: 'Dynamisme sur l\'aile gauche.' },
      { id: 'za6', name: 'Siyabonga NGEZANA', pos: 'Défenseur', n: 3, age: 28, born: '15/07/1997', h: '1m88', club: 'FCSB', caps: 8, goals: 0, ast: 0, debut: '2018', photo: 'images/players/905541.webp', role: 'Titulaire', bio: 'Défenseur central installé en Europe.' },
      { id: 'za7', name: 'Nkosinathi SIBISI', pos: 'Défenseur', n: 5, age: 30, born: '22/09/1995', h: '1m83', club: 'Orlando Pirates', caps: 10, goals: 0, ast: 0, debut: '2021', photo: 'images/players/902117.webp', role: 'Titulaire', bio: 'Pilier défensif des Pirates.' },
      { id: 'za8', name: 'Thabang MATULUDI', pos: 'Défenseur', n: 4, age: 26, born: '11/04/2000', club: 'Polokwane City', caps: 2, photo: 'images/players/tm_thabang_matuludi.jpg', role: 'Remplaçant', bio: 'Nouveau venu en sélection.' },
      { id: 'za9', name: 'Tylon SMITH', pos: 'Défenseur', n: 15, age: 24, born: '2001', club: 'QPR', caps: 5, photo: 'images/players/1822468.webp', role: 'Remplaçant', bio: 'Espoir en Angleterre.' },
      { id: 'za10', name: 'Samukele KABINI', pos: 'Défenseur', n: 13, age: 21, born: '2004', club: 'Molde', caps: 3, photo: 'images/players/1518180.webp', role: 'Remplaçant', bio: 'Jeune talent en Norvège.' },
      { id: 'za11', name: 'Teboho MOKOENA', pos: 'Milieu', n: 4, age: 29, born: '24/01/1997', h: '1m76', club: 'Mamelodi Sundowns', caps: 40, goals: 6, ast: 5, debut: '2017', photo: 'images/players/tsdb_teboho_mokoena.jpg', role: 'Titulaire', bio: 'Métronome au milieu de terrain.' },
      { id: 'za12', name: 'Sphephelo SITHOLE', pos: 'Milieu', n: 8, age: 27, born: '03/03/1999', h: '1m85', club: 'Tondela', caps: 20, goals: 2, ast: 1, debut: '2022', photo: 'images/players/tm_sphephelo_sithole.jpg', role: 'Titulaire', bio: 'Sentinelle physique évoluant au Portugal.' },
      { id: 'za13', name: 'Themba ZWANE', pos: 'Milieu', n: 10, age: 36, born: '03/08/1989', h: '1m70', club: 'Mamelodi Sundowns', caps: 50, goals: 10, ast: 12, debut: '2014', photo: 'images/players/tsdb_themba_zwane.jpg', role: 'Titulaire', bio: 'Le génie créatif sud-africain.' },
      { id: 'za14', name: 'Bathusi AUBAAS', pos: 'Milieu', n: 5, age: 31, born: '14/05/1995', club: 'Mamelodi Sundowns', caps: 10, photo: 'images/players/tm_bathusi_aubaas.jpg', role: 'Remplaçant', bio: 'Relayeur infatigable.' },
      { id: 'za15', name: 'Thalente MBATHA', pos: 'Milieu', n: 14, age: 26, born: '06/03/2000', club: 'Orlando Pirates', caps: 5, photo: 'images/players/1014410.webp', role: 'Remplaçant', bio: 'Révélation du milieu.' },
      { id: 'za16', name: 'Thapelo MASEKO', pos: 'Milieu', n: 18, age: 22, born: '11/11/2003', club: 'Mamelodi Sundowns', caps: 12, photo: 'images/players/1179164.webp', role: 'Remplaçant', bio: 'Ailier percutant.' },
      { id: 'za17', name: 'Lyle FOSTER', pos: 'Attaquant', n: 11, age: 25, born: '03/09/2000', h: '1m85', club: 'Burnley', caps: 25, goals: 8, ast: 3, debut: '2018', photo: 'images/players/tsdb_lyle_foster.jpg', role: 'Titulaire', bio: 'L\'atout offensif numéro 1.' },
      { id: 'za18', name: 'Percy TAU', pos: 'Attaquant', n: 7, age: 32, born: '13/05/1994', h: '1m75', club: 'Al Ahly', caps: 50, goals: 16, ast: 10, debut: '2015', photo: 'images/players/tsdb_percy_tau.jpg', role: 'Titulaire', bio: 'Le magicien du Nil.' },
      { id: 'za19', name: 'Oswin APPOLLIS', pos: 'Attaquant', n: 17, age: 24, born: '25/08/2001', club: 'Orlando Pirates', caps: 6, photo: 'https://img.sofascore.com/api/v1/player/984505/image', role: 'Titulaire', bio: 'Ailier très prometteur.' },
      { id: 'za20', name: 'Evidence MAKGOPA', pos: 'Attaquant', n: 9, age: 25, born: '05/06/2000', h: '1m88', club: 'Orlando Pirates', caps: 20, goals: 6, ast: 2, debut: '2021', photo: 'images/players/1022170.webp', role: 'Remplaçant', bio: 'Axe vertical des Pirates.' },
      { id: 'za21', name: 'Relebohile MOFOKENG', pos: 'Attaquant', n: 25, age: 21, born: '2004', club: 'Orlando Pirates', caps: 5, photo: 'images/players/1564998.webp', role: 'Remplaçant', bio: 'Futur pépite de la nation.' },
      { id: 'za22', name: 'Mihlali MAYAMBELA', pos: 'Attaquant', n: 19, age: 29, born: '25/08/1996', h: '1m80', club: 'Aris Limassol', caps: 15, goals: 3, ast: 2, debut: '2022', photo: 'images/players/829860.webp', role: 'Remplaçant', bio: 'Expérience européenne.' },
      { id: 'za23', name: 'Tshepang MOREMI', pos: 'Attaquant', n: 24, age: 25, club: 'AmaZulu', caps: 3, photo: 'images/players/1101745.webp', role: 'Remplaçant', bio: 'Vitesse de pointe.' }
    ]
  },
  'Canada': {
coach: 'Daryl Powell', formation: '4-3-3', confederation: 'FIFA', titles: 0,
    players: [
      { id: 'can1', name: 'Maxime CRÉPEAU', pos: 'Gardien', n: 16, age: 30, born: '11/04/1994', h: '1m86', club: 'Portland Timbers', caps: 22, goals: 0, ast: 0, debut: '2016', photo: 'images/players/155736.webp', role: 'Titulaire', bio: 'Gardien titulaire et héros de la Copa 2024.' },
      { id: 'can2', name: 'Alistair JOHNSTON', pos: 'Défenseur', n: 2, age: 25, born: '08/10/1998', h: '1m80', club: 'Celtic Glasgow', caps: 48, goals: 1, ast: 3, debut: '2021', photo: 'images/players/tsdb_alistair_johnston.jpg', role: 'Titulaire', bio: 'Latéral droit infatigable du Celtic.' },
      { id: 'can3', name: 'Moïse BOMBITO', pos: 'Défenseur', n: 15, age: 24, born: '30/03/2000', h: '1m90', club: 'Nice', caps: 12, goals: 0, ast: 0, debut: '2023', photo: 'images/players/1469180.webp', role: 'Titulaire', bio: 'Défenseur central ultra-rapide passé à Nice.' },
      { id: 'can4', name: 'Derek CORNELIUS', pos: 'Défenseur', n: 13, age: 26, born: '25/11/1997', h: '1m88', club: 'Marseille', caps: 26, goals: 0, ast: 0, debut: '2018', photo: 'images/players/801411.webp', role: 'Titulaire', bio: 'Défenseur solide de l\'OM.' },
      { id: 'can5', name: 'Alphonso DAVIES', pos: 'Défenseur', n: 19, age: 23, born: '02/11/2000', h: '1m81', club: 'Bayern Munich', caps: 53, goals: 15, ast: 18, debut: '2017', photo: 'images/players/843665.webp', role: 'Titulaire', bio: 'La superstar mondiale du Canada.' },
      { id: 'can6', name: 'Stephen EUSTÁQUIO', pos: 'Milieu', n: 7, age: 27, born: '21/12/1996', h: '1m78', club: 'FC Porto', caps: 42, goals: 4, ast: 5, debut: '2019', photo: 'images/players/886223.webp', role: 'Titulaire', bio: 'Moteur et cerveau du milieu canadien.' },
      { id: 'can7', name: 'Ismaël KONÉ', pos: 'Milieu', n: 8, age: 22, born: '16/06/2002', h: '1m88', club: 'Marseille', caps: 24, goals: 2, ast: 1, debut: '2022', photo: 'images/players/1134351.webp', role: 'Titulaire', bio: 'Milieu élégant évoluant à l\'OM.' },
      { id: 'can8', name: 'Jonathan OSORIO', pos: 'Milieu', n: 21, age: 32, born: '12/06/1992', h: '1m75', club: 'Toronto FC', caps: 78, goals: 9, ast: 8, debut: '2013', photo: 'images/players/273031.webp', role: 'Titulaire', bio: 'Le vétéran créatif de Toronto.' },
      { id: 'can9', name: 'Jacob SHAFFELBURG', pos: 'Attaquant', n: 14, age: 24, born: '26/11/1999', h: '1m78', club: 'Nashville SC', caps: 15, goals: 3, ast: 2, debut: '2020', photo: 'images/players/976313.webp', role: 'Titulaire', bio: 'Ailier très percutant.' },
      { id: 'can10', name: 'Jonathan DAVID', pos: 'Attaquant', n: 10, age: 24, born: '14/01/2000', h: '1m80', club: 'Lille OSC', caps: 53, goals: 28, ast: 12, debut: '2018', photo: 'images/players/935564.webp', role: 'Titulaire', bio: 'Le serial buteur du Canada.' },
      { id: 'can11', name: 'Cyle LARIN', pos: 'Attaquant', n: 9, age: 29, born: '17/04/1995', h: '1m88', club: 'Majorque', caps: 72, goals: 29, ast: 5, debut: '2014', photo: 'images/players/790179.webp', role: 'Titulaire', bio: 'Meilleur buteur de l\'histoire du Canada.' },
      { id: 'can12', name: 'Dayne ST. CLAIR', pos: 'Gardien', n: 1, age: 27, born: '09/05/1997', h: '1m90', club: 'Minnesota Utd', caps: 5, goals: 0, ast: 0, debut: '2021', photo: 'images/players/973286.webp', role: 'Remplaçant', bio: 'Gardien dynamique de MLS.' },
      { id: 'can13', name: 'James PANTEMIS', pos: 'Gardien', n: 12, age: 27, born: '21/02/1997', h: '1m83', club: 'Portland Timbers', caps: 0, goals: 0, ast: 0, debut: '2022', photo: 'images/players/928432.webp', role: 'Remplaçant', bio: 'Gardien remplaçant de MLS.' },
      { id: 'can14', name: 'Kamal MILLER', pos: 'Défenseur', n: 4, age: 27, born: '16/05/1997', h: '1m83', club: 'Portland Timbers', caps: 45, goals: 0, ast: 1, debut: '2019', photo: 'images/players/934841.webp', role: 'Remplaçant', bio: 'Défenseur central gaucher d\'expérience.' },
      { id: 'can15', name: 'Richie LARYEA', pos: 'Défenseur', n: 22, age: 29, born: '07/01/1995', h: '1m75', club: 'Toronto FC', caps: 55, goals: 1, ast: 4, debut: '2019', photo: 'images/players/829207.webp', role: 'Remplaçant', bio: 'Latéral droit très dynamique.' },
      { id: 'can16', name: 'Sam ADEKUGBE', pos: 'Défenseur', n: 3, age: 29, born: '16/01/1995', h: '1m76', club: 'Vancouver', caps: 42, goals: 1, ast: 3, debut: '2015', photo: 'images/players/tsdb_sam_adekugbe.jpg', role: 'Remplaçant', bio: 'Latéral gauche fiable.' },
      { id: 'can17', name: 'Joel WATERMAN', pos: 'Défenseur', n: 5, age: 28, born: '24/01/1996', h: '1m88', club: 'CF Montréal', caps: 5, goals: 0, ast: 0, debut: '2022', photo: 'images/players/1020472.webp', role: 'Remplaçant', bio: 'Défenseur central solide du CF Montréal.' },
      { id: 'can18', name: 'Mathieu CHOINIÈRE', pos: 'Milieu', n: 21, age: 25, born: '07/02/1999', h: '1m75', club: 'Grasshopper', caps: 5, goals: 0, ast: 1, debut: '2023', photo: 'images/players/937255.webp', role: 'Remplaçant', bio: 'Milieu polyvalent.' },
      { id: 'can19', name: 'Samuel PIETTE', pos: 'Milieu', n: 6, age: 29, born: '12/11/1994', h: '1m76', club: 'CF Montréal', caps: 69, goals: 0, ast: 3, debut: '2012', photo: 'images/players/155827.webp', role: 'Remplaçant', bio: 'Sentinelle et leader du CF Montréal.' },
      { id: 'can20', name: 'Ali AHMED', pos: 'Milieu', n: 20, age: 23, born: '10/10/2000', h: '1m80', club: 'Vancouver', caps: 7, goals: 0, ast: 1, debut: '2023', photo: 'images/players/1464637.webp', role: 'Remplaçant', bio: 'Jeune talent montant.' },
      { id: 'can21', name: 'Liam MILLAR', pos: 'Attaquant', n: 23, age: 24, born: '27/09/1999', h: '1m75', club: 'Hull City', caps: 30, goals: 1, ast: 2, debut: '2018', photo: 'images/players/902083.webp', role: 'Remplaçant', bio: 'Attaquant rapide évoluant en Angleterre.' },
      { id: 'can22', name: 'Theo BAIR', pos: 'Attaquant', n: 11, age: 24, born: '27/08/1999', h: '1m91', club: 'Auxerre', caps: 5, goals: 1, ast: 0, debut: '2020', photo: 'images/players/936848.webp', role: 'Remplaçant', bio: 'Attaquant physique évoluant à l\'AJ Auxerre.' },
      { id: 'can23', name: 'Tani OLUWASEYI', pos: 'Attaquant', n: 25, age: 24, born: '15/05/2000', h: '1m88', club: 'Minnesota Utd', caps: 3, goals: 0, ast: 1, debut: '2024', photo: 'images/players/1172477.webp', role: 'Remplaçant', bio: 'Nouveau visage de l\'attaque canadienne.' }
    ]
  },
  'Suisse': {
    coach: 'Murat Yakın', formation: '3-4-2-1', confederation: 'UEFA', titles: 0,
    players: [
      { id: 'sui1', name: 'Yann SOMMER', pos: 'Gardien', n: 1, age: 35, born: '17/12/1988', h: '1m83', club: 'Inter Milan', caps: 94, goals: 0, ast: 0, debut: '2012', photo: 'images/players/tsdb_yann_sommer.jpg', role: 'Titulaire', bio: 'Gardien légendaire, champion d\'Italie avec l\'Inter.' },
      { id: 'sui2', name: 'Manuel AKANJI', pos: 'Défenseur', n: 5, age: 29, born: '19/07/1995', h: '1m88', club: 'Man. City', caps: 65, goals: 3, ast: 2, debut: '2017', photo: 'images/players/383560.webp', role: 'Titulaire', bio: 'Pilier de la défense de Manchester City.' },
      { id: 'sui3', name: 'Fabian SCHÄR', pos: 'Défenseur', n: 22, age: 32, born: '20/12/1991', h: '1m86', club: 'Newcastle Utd', caps: 86, goals: 8, ast: 1, debut: '2013', photo: 'images/players/101882.webp', role: 'Titulaire', bio: 'Défenseur buteur très élégant.' },
      { id: 'sui4', name: 'Ricardo RODRIGUEZ', pos: 'Défenseur', n: 13, age: 32, born: '25/08/1992', h: '1m80', club: 'Betis Séville', caps: 120, goals: 9, ast: 11, debut: '2011', photo: 'images/players/tsdb_ricardo_rodriguez.jpg', role: 'Titulaire', bio: 'Expert infatigable du flanc gauche.' },
      { id: 'sui5', name: 'Silvan WIDMER', pos: 'Défenseur', n: 3, age: 31, born: '05/03/1993', h: '1m83', club: 'Mayence', caps: 45, goals: 4, ast: 5, debut: '2014', photo: 'images/players/tsdb_silvan_widmer.jpg', role: 'Titulaire', bio: 'Latéral droit très solide.' },
      { id: 'sui6', name: 'Granit XHAKA', pos: 'Milieu', n: 10, age: 31, born: '27/09/1992', h: '1m85', club: 'Bayer Leverkusen', caps: 130, goals: 14, ast: 12, debut: '2011', photo: 'images/players/tsdb_granit_xhaka.jpg', role: 'Titulaire', bio: 'Capitaine et cerveau de l\'équipe, champion d\'Allemagne.' },
      { id: 'sui7', name: 'Remo FREULER', pos: 'Milieu', n: 8, age: 32, born: '15/04/1992', h: '1m80', club: 'Bologne', caps: 70, goals: 9, ast: 6, debut: '2017', photo: 'images/players/tsdb_remo_freuler.jpg', role: 'Titulaire', bio: 'Milieu box-to-box très travailleur.' },
      { id: 'sui8', name: 'Michel AEBISCHER', pos: 'Milieu', n: 20, age: 27, born: '06/01/1997', h: '1m83', club: 'Bologne', caps: 25, goals: 1, ast: 3, debut: '2019', photo: 'images/players/850891.webp', role: 'Titulaire', bio: 'Milieu de terrain polyvalent et technique.' },
      { id: 'sui9', name: 'Dan NDOYE', pos: 'Attaquant', n: 19, age: 23, born: '25/10/2000', h: '1m84', club: 'Bologne', caps: 15, goals: 1, ast: 2, debut: '2022', photo: 'images/players/944327.webp', role: 'Titulaire', bio: 'Ailier percutant et rapide.' },
      { id: 'sui10', name: 'Breel EMBOLO', pos: 'Attaquant', n: 7, age: 27, born: '14/02/1997', h: '1m87', club: 'Monaco', caps: 65, goals: 15, ast: 8, debut: '2015', photo: 'images/players/352296.webp', role: 'Titulaire', bio: 'Puissant avant-centre de l\'AS Monaco.' },
      { id: 'sui11', name: 'Ruben VARGAS', pos: 'Attaquant', n: 17, age: 25, born: '05/08/1998', h: '1m74', club: 'Augsbourg', caps: 45, goals: 8, ast: 10, debut: '2019', photo: 'images/players/tsdb_ruben_vargas.jpg', role: 'Titulaire', bio: 'Ailier virevoltant et créateur.' },
      { id: 'sui12', name: 'Gregor KOBEL', pos: 'Gardien', n: 21, age: 26, born: '06/12/1997', h: '1m94', club: 'Dortmund', caps: 5, goals: 0, ast: 0, debut: '2021', photo: 'images/players/tsdb_gregor_kobel.jpg', role: 'Remplaçant', bio: 'L\'un des meilleurs gardiens de Bundesliga.' },
      { id: 'sui13', name: 'Yvon MVOGO', pos: 'Gardien', n: 12, age: 30, born: '06/06/1994', h: '1m90', club: 'Lorient', caps: 9, goals: 0, ast: 0, debut: '2018', photo: 'images/players/tsdb_yvon_mvogo.jpg', role: 'Remplaçant', bio: 'Gardien expérimenté.' },
      { id: 'sui14', name: 'Nico ELVEDI', pos: 'Défenseur', n: 4, age: 27, born: '30/09/1996', h: '1m89', club: 'M\'gladbach', caps: 53, goals: 2, ast: 1, debut: '2016', photo: 'images/players/tsdb_nico_elvedi.jpg', role: 'Remplaçant', bio: 'Défenseur central fiable.' },
      { id: 'sui15', name: 'Cédric ZESIGER', pos: 'Défenseur', n: 2, age: 26, born: '24/06/1998', h: '1m94', club: 'Wolfsburg', caps: 4, goals: 0, ast: 0, debut: '2021', photo: 'images/players/798926.webp', role: 'Remplaçant', bio: 'Défenseur central physique.' },
      { id: 'sui16', name: 'Leonidas STERGIOU', pos: 'Défenseur', n: 15, age: 22, born: '03/03/2002', h: '1m81', club: 'Stuttgart', caps: 5, goals: 0, ast: 1, debut: '2022', photo: 'images/players/tsdb_leonidas_stergiou.jpg', role: 'Remplaçant', bio: 'Jeune talent prometteur.' },
      { id: 'sui17', name: 'Denis ZAKARIA', pos: 'Milieu', n: 6, age: 27, born: '20/11/1996', h: '1m91', club: 'Monaco', caps: 54, goals: 3, ast: 4, debut: '2016', photo: 'images/players/770677.webp', role: 'Remplaçant', bio: 'Milieu puissant et technique.' },
      { id: 'sui18', name: 'Vincent SIERRO', pos: 'Milieu', n: 16, age: 28, born: '08/10/1995', h: '1m84', club: 'Toulouse', caps: 6, goals: 0, ast: 1, debut: '2024', photo: 'images/players/794412.webp', role: 'Remplaçant', bio: 'Capitaine de Toulouse.' },
      { id: 'sui19', name: 'Fabian RIEDER', pos: 'Milieu', n: 26, age: 22, born: '16/02/2002', h: '1m81', club: 'Stuttgart', caps: 11, goals: 0, ast: 1, debut: '2022', photo: 'images/players/929620.webp', role: 'Remplaçant', bio: 'Milieu offensif créatif.' },
      { id: 'sui20', name: 'Xherdan SHAQIRI', pos: 'Milieu', n: 23, age: 32, born: '10/10/1991', h: '1m69', club: 'FC Bâle', caps: 125, goals: 32, ast: 30, debut: '2010', photo: 'images/players/65953.webp', role: 'Remplaçant', bio: 'Légende vivante et magicien de l\'attaque.' },
      { id: 'sui21', name: 'Noah OKAFOR', pos: 'Attaquant', n: 11, age: 24, born: '24/05/2000', h: '1m85', club: 'AC Milan', caps: 22, goals: 2, ast: 3, debut: '2019', photo: 'images/players/865523.webp', role: 'Remplaçant', bio: 'Attaquant rapide du Milan.' },
      { id: 'sui22', name: 'Zeki AMDOUNI', pos: 'Attaquant', n: 25, age: 23, born: '04/12/2000', h: '1m85', club: 'Benfica', caps: 19, goals: 7, ast: 1, debut: '2022', photo: 'images/players/990550.webp', role: 'Remplaçant', bio: 'Buteur adroit face au but.' },
      { id: 'sui23', name: 'Kwadwo DUAH', pos: 'Attaquant', n: 18, age: 27, born: '24/02/1997', h: '1m85', club: 'Ludogorets', caps: 5, goals: 1, ast: 0, debut: '2024', photo: 'images/players/827531.webp', role: 'Remplaçant', bio: 'Révélation offensive de l\'Euro.' }
    ]
  },
  'Qatar': {
    coach: 'Tintín Márquez', formation: '4-3-3', confederation: 'AFC', titles: 0,
    players: [
      { id: 'qat1', name: 'Meshaal BARSHAM', pos: 'Gardien', n: 22, age: 26, born: '14/02/1998', h: '1m84', club: 'Al-Sadd', caps: 40, goals: 0, ast: 0, debut: '2020', photo: 'images/players/891157.webp', role: 'Titulaire', bio: 'Gardien titulaire élu meilleur gardien de la Coupe d\'Asie 2024.' },
      { id: 'qat2', name: 'Lucas MENDES', pos: 'Défenseur', n: 3, age: 34, born: '03/07/1990', h: '1m84', club: 'Al-Wakrah', caps: 15, goals: 0, ast: 1, debut: '2023', photo: 'images/players/243199.webp', role: 'Titulaire', bio: 'Défenseur central d\'expérience, naturalisé qatari.' },
      { id: 'qat3', name: 'Boualem KHOUKHI', pos: 'Défenseur', n: 16, age: 33, born: '07/09/1990', h: '1m84', club: 'Al-Sadd', caps: 115, goals: 21, ast: 5, debut: '2013', photo: 'images/players/233746.webp', role: 'Titulaire', bio: 'Pilier polyvalent de la défense qatarie.' },
      { id: 'qat4', name: 'Pedro MIGUEL', pos: 'Défenseur', n: 2, age: 33, born: '06/08/1990', h: '1m81', club: 'Al-Sadd', caps: 95, goals: 1, ast: 8, debut: '2016', photo: 'images/players/884189.webp', role: 'Titulaire', bio: 'Latéral droit surnommé Ro-Ro.' },
      { id: 'qat5', name: 'Mohammed WAAD', pos: 'Défenseur', n: 4, age: 24, born: '18/09/1999', h: '1m80', club: 'Al-Sadd', caps: 42, goals: 0, ast: 3, debut: '2020', photo: 'images/players/926473.webp', role: 'Titulaire', bio: 'Latéral gauche moderne et rapide.' },
      { id: 'qat6', name: 'Ahmed FATI', pos: 'Milieu', n: 20, age: 31, born: '25/01/1993', h: '1m78', club: 'Al-Arabi', caps: 25, goals: 0, ast: 1, debut: '2017', photo: 'https://img.sofascore.com/api/v1/player/2063712/image', role: 'Titulaire', bio: 'Milieu récupérateur solide.' },
      { id: 'qat7', name: 'Jassem GABER', pos: 'Milieu', n: 24, age: 22, born: '20/02/2002', h: '1m82', club: 'Al-Arabi', caps: 20, goals: 1, ast: 2, debut: '2022', photo: 'images/players/1014561.webp', role: 'Titulaire', bio: 'Jeune talent du milieu de terrain.' },
      { id: 'qat8', name: 'Hassan AL-HAYDOS', pos: 'Milieu', n: 10, age: 33, born: '11/12/1990', h: '1m74', club: 'Al-Sadd', caps: 182, goals: 41, ast: 45, debut: '2008', photo: 'images/players/93953.webp', role: 'Titulaire', bio: 'Capitaine légendaire et meneur exemplaire.' },
      { id: 'qat9', name: 'Akram AFIF', pos: 'Attaquant', n: 11, age: 27, born: '18/11/1996', h: '1m77', club: 'Al-Sadd', caps: 110, goals: 35, ast: 40, debut: '2015', photo: 'images/players/794541.webp', role: 'Titulaire', bio: 'La star absolue du Qatar, magicien technique.' },
      { id: 'qat10', name: 'Almoez ALI', pos: 'Attaquant', n: 19, age: 27, born: '19/08/1996', h: '1m80', club: 'Al-Duhail', caps: 112, goals: 52, ast: 15, debut: '2013', photo: 'images/players/796501.webp', role: 'Titulaire', bio: 'Buteur prolifique et recordman de la Coupe d\'Asie.' },
      { id: 'qat11', name: 'Yusuf ABDURISAG', pos: 'Attaquant', n: 20, age: 24, born: '06/08/1999', h: '1m76', club: 'Al-Sadd', caps: 32, goals: 3, ast: 4, debut: '2019', photo: 'images/players/985156.webp', role: 'Titulaire', bio: 'Ailier percutant et généreux.' },
      { id: 'qat12', name: 'Saad AL-SHEEB', pos: 'Gardien', n: 1, age: 34, born: '19/02/1990', h: '1m85', club: 'Al-Sadd', caps: 85, goals: 0, ast: 0, debut: '2009', photo: 'images/players/95253.webp', role: 'Remplaçant', bio: 'Gardien historique du Qatar.' },
      { id: 'qat13', name: 'Salah ZAKARIA', pos: 'Gardien', n: 21, age: 25, born: '24/04/1999', h: '1m85', club: 'Al-Duhail', caps: 5, goals: 0, ast: 0, debut: '2023', photo: 'images/players/985171.webp', role: 'Remplaçant', bio: 'Jeune gardien d\'avenir.' },
      { id: 'qat14', name: 'Tarek SALMAN', pos: 'Défenseur', n: 5, age: 26, born: '05/12/1997', h: '1m78', club: 'Al-Sadd', caps: 72, goals: 0, ast: 1, debut: '2017', photo: 'images/players/tsdb_tarek_salman.jpg', role: 'Remplaçant', bio: 'Défenseur technique et polyvalent.' },
      { id: 'qat15', name: 'Bassam AL-RAWI', pos: 'Défenseur', n: 15, age: 26, born: '16/12/1997', h: '1m75', club: 'Al-Rayyan', caps: 68, goals: 2, ast: 3, debut: '2017', photo: 'images/players/796499.webp', role: 'Remplaçant', bio: 'Spécialiste des coups francs.' },
      { id: 'qat16', name: 'Musab KHEDER', pos: 'Défenseur', n: 13, age: 31, born: '26/09/1993', h: '1m74', club: 'Al-Sadd', caps: 35, goals: 0, ast: 2, debut: '2017', photo: 'https://img.sofascore.com/api/v1/player/1106234/image', role: 'Remplaçant', bio: 'Latéral droit d\'expérience.' },
      { id: 'qat17', name: 'Homam AHMED', pos: 'Défenseur', n: 14, age: 24, born: '25/08/1999', h: '1m86', club: 'Al-Gharafa', caps: 50, goals: 3, ast: 5, debut: '2020', photo: 'images/players/tsdb_homam_ahmed.jpg', role: 'Remplaçant', bio: 'Latéral gauche très offensif.' },
      { id: 'qat18', name: 'Abdulaziz HATEM', pos: 'Milieu', n: 6, age: 33, born: '28/10/1990', h: '1m83', club: 'Al-Rayyan', caps: 115, goals: 11, ast: 8, debut: '2011', photo: 'images/players/tsdb_abdulaziz_hatem.jpg', role: 'Remplaçant', bio: 'Milieu relayeur gaucher, grand frappeur de loin.' },
      { id: 'qat19', name: 'Mostafa MESHAAL', pos: 'Milieu', n: 16, age: 23, born: '28/03/2001', h: '1m78', club: 'Al-Sadd', caps: 15, goals: 0, ast: 2, debut: '2022', photo: 'images/players/2505039.webp', role: 'Remplaçant', bio: 'Jeune milieu créatif prometteur.' },
      { id: 'qat20', name: 'Ali ASSAD', pos: 'Milieu', n: 8, age: 31, born: '19/01/1993', h: '1m76', club: 'Al-Sadd', caps: 78, goals: 12, ast: 12, debut: '2013', photo: 'images/players/tsdb_ali_assad.jpg', role: 'Remplaçant', bio: 'Meneur de jeu fin techniquement.' },
      { id: 'qat21', name: 'Ahmed ALAAELDIN', pos: 'Attaquant', n: 7, age: 31, born: '31/01/1993', h: '1m78', club: 'Al-Gharafa', caps: 62, goals: 7, ast: 3, debut: '2016', photo: 'images/players/229278.webp', role: 'Remplaçant', bio: 'Buteur puissant en sortie de banc.' },
      { id: 'qat22', name: 'Ahmed AL-RAWI', pos: 'Attaquant', n: 18, age: 20, born: '30/05/2004', h: '1m80', club: 'Al-Rayyan', caps: 8, goals: 2, ast: 1, debut: '2023', photo: 'images/players/1144626.webp', role: 'Remplaçant', bio: 'Grand espoir offensif.' },
      { id: 'qat23', name: 'Ismaeel MOHAMMAD', pos: 'Attaquant', n: 17, age: 34, born: '05/04/1990', h: '1m68', club: 'Al-Duhail', caps: 82, goals: 4, ast: 15, debut: '2014', photo: 'images/players/303842.webp', role: 'Remplaçant', bio: 'L\'expérience et la vitesse sur l\'aile.' }
    ]
  },
  'Serbie': {
    coach: 'Dragan Stojković', formation: '3-4-2-1', confederation: 'UEFA', titles: 0,
    players: [
      { id: 'srb1', name: 'Vanja MILINKOVIĆ-SAVIĆ', pos: 'Gardien', n: 1, age: 27, born: '20/02/1997', h: '2m02', club: 'Torino', caps: 25, goals: 0, ast: 0, debut: '2021', photo: 'images/players/356160.webp', role: 'Titulaire', bio: 'Gardien géant évoluant en Serie A.' },
      { id: 'srb2', name: 'Strahinja PAVLOVIĆ', pos: 'Défenseur', n: 2, age: 23, born: '24/05/2001', h: '1m94', club: 'AC Milan', caps: 38, goals: 4, ast: 1, debut: '2021', photo: 'images/players/tsdb_strahinja_pavlovic.jpg', role: 'Titulaire', bio: 'Défenseur central puissant de l\'AC Milan.' },
      { id: 'srb3', name: 'Nikola MILENKOVIĆ', pos: 'Défenseur', n: 4, age: 26, born: '12/10/1997', h: '1m95', club: 'Nottm Forest', caps: 55, goals: 3, ast: 1, debut: '2016', photo: 'images/players/836168.webp', role: 'Titulaire', bio: 'Le roc de la défense serbe en Premier League.' },
      { id: 'srb4', name: 'Miloš VELJKOVIĆ', pos: 'Défenseur', n: 5, age: 28, born: '26/09/1995', h: '1m88', club: 'Werder Brême', caps: 32, goals: 1, ast: 0, debut: '2017', photo: 'images/players/155961.webp', role: 'Titulaire', bio: 'Défenseur central fiable de Bundesliga.' },
      { id: 'srb5', name: 'Nemanja MAKSIMOVIĆ', pos: 'Milieu', n: 6, age: 29, born: '26/01/1995', h: '1m84', club: 'Getafe', caps: 48, goals: 0, ast: 2, debut: '2016', photo: 'images/players/331449.webp', role: 'Titulaire', bio: 'Milieu défensif infatigable.' },
      { id: 'srb6', name: 'Sergej MILINKOVIĆ-SAVIĆ', pos: 'Milieu', n: 20, age: 29, born: '27/02/1995', h: '1m92', club: 'Al-Hilal', caps: 54, goals: 9, ast: 10, debut: '2017', photo: 'images/players/tsdb_sergej_milinkovic_savic.jpg', role: 'Titulaire', bio: 'Le Maestro serbe, maître du milieu.' },
      { id: 'srb7', name: 'Saša LUKIĆ', pos: 'Milieu', n: 22, age: 27, born: '13/08/1996', h: '1m83', club: 'Fulham', caps: 45, goals: 2, ast: 4, debut: '2018', photo: 'images/players/tsdb_sasa_lukic.jpg', role: 'Titulaire', bio: 'Milieu polyvalent de Premier League.' },
      { id: 'srb8', name: 'Dušan TADIĆ', pos: 'Milieu', n: 10, age: 35, born: '20/11/1988', h: '1m81', club: 'Fenerbahçe', caps: 110, goals: 23, ast: 42, debut: '2008', photo: 'images/players/38560.webp', role: 'Remplaçant', bio: 'Capitaine créatif et légende de la sélection.' },
      { id: 'srb9', name: 'Filip KOSTIĆ', pos: 'Milieu', n: 11, age: 31, born: '01/11/1992', h: '1m84', club: 'Fenerbahçe', caps: 65, goals: 3, ast: 15, debut: '2015', photo: 'images/players/126588.webp', role: 'Remplaçant', bio: 'Spécialiste infatigable des centres précis.' },
      { id: 'srb10', name: 'Aleksandar MITROVIĆ', pos: 'Attaquant', n: 9, age: 29, born: '16/09/1994', h: '1m89', club: 'Al-Hilal', caps: 92, goals: 58, ast: 8, debut: '2013', photo: 'images/players/192144.webp', role: 'Titulaire', bio: 'Meilleur buteur historique de la Serbie.' },
      { id: 'srb11', name: 'Dušan VLAHOVIĆ', pos: 'Attaquant', n: 7, age: 24, born: '28/01/2000', h: '1m90', club: 'Juventus', caps: 30, goals: 13, ast: 4, debut: '2020', photo: 'images/players/832208.webp', role: 'Titulaire', bio: 'Buteur puissant et talentueux de la Juventus.' },
      { id: 'srb12', name: 'Predrag RAJKOVIĆ', pos: 'Gardien', n: 12, age: 28, born: '31/10/1995', h: '1m92', club: 'Ittihad', caps: 32, goals: 0, ast: 0, debut: '2013', photo: 'images/players/188107.webp', role: 'Remplaçant', bio: 'Gardien d\'expérience.' },
      { id: 'srb13', name: 'Đorđe PETROVIĆ', pos: 'Gardien', n: 23, age: 24, born: '08/10/1999', h: '1m94', club: 'Strasbourg', caps: 3, goals: 0, ast: 0, debut: '2021', photo: 'https://img.sofascore.com/api/v1/player/882604/image', role: 'Remplaçant', bio: 'Gardien talentueux prêté par Chelsea.' },
      { id: 'srb14', name: 'Nemanja GUDELJ', pos: 'Défenseur', n: 6, age: 32, born: '16/11/1991', h: '1m87', club: 'FC Séville', caps: 62, goals: 1, ast: 3, debut: '2014', photo: 'images/players/68332.webp', role: 'Titulaire', bio: 'Défenseur/Milieu polyvalent et physique.' },
      { id: 'srb15', name: 'Srdjan BABIĆ', pos: 'Défenseur', n: 15, age: 28, born: '22/04/1996', h: '1m94', club: 'Spartak Moscou', caps: 8, goals: 1, ast: 0, debut: '2022', photo: 'images/players/280815.webp', role: 'Remplaçant', bio: 'Défenseur central puissant pour les duels aériens.' },
      { id: 'srb16', name: 'Filip MLADENOVIĆ', pos: 'Défenseur', n: 25, age: 32, born: '15/08/1991', h: '1m80', club: 'Panathinaïkos', caps: 30, goals: 1, ast: 4, debut: '2012', photo: 'images/players/126680.webp', role: 'Remplaçant', bio: 'Latéral gauche d\'expérience.' },
      { id: 'srb17', name: 'Nemanja MAKSIMOVIĆ', pos: 'Milieu', n: 8, age: 29, born: '26/01/1995', h: '1m84', club: 'Panathinaïkos', caps: 50, goals: 0, ast: 2, debut: '2016', photo: 'images/players/331449.webp', role: 'Remplaçant', bio: 'Milieu défensif travailleur.' },
      { id: 'srb18', name: 'Ivan ILIĆ', pos: 'Milieu', n: 17, age: 23, born: '17/03/2001', h: '1m85', club: 'Torino', caps: 18, goals: 0, ast: 2, debut: '2021', photo: 'images/players/tsdb_ivan_ilic.jpg', role: 'Remplaçant', bio: 'Jeune milieu créatif à suivre.' },
      { id: 'srb19', name: 'Lazar SAMARDŽIĆ', pos: 'Milieu', n: 19, age: 22, born: '24/02/2002', h: '1m84', club: 'Atalanta', caps: 12, goals: 0, ast: 2, debut: '2023', photo: 'images/players/980624.webp', role: 'Remplaçant', bio: 'Milieu offensif très talentueux d\'Atalanta.' },
      { id: 'srb20', name: 'Marko GRUJIĆ', pos: 'Milieu', n: 16, age: 28, born: '13/04/1996', h: '1m91', club: 'FC Porto', caps: 25, goals: 0, ast: 1, debut: '2016', photo: 'images/players/280835.webp', role: 'Remplaçant', bio: 'Impact physique et technique au milieu.' },
      { id: 'srb21', name: 'Luka JOVIĆ', pos: 'Attaquant', n: 19, age: 26, born: '23/12/1997', h: '1m82', club: 'AC Milan', caps: 38, goals: 11, ast: 2, debut: '2018', photo: 'images/players/319129.webp', role: 'Titulaire', bio: 'Buteur opportuniste de classe mondiale.' },
      { id: 'srb22', name: 'Andrija ŽIVKOVIĆ', pos: 'Attaquant', n: 14, age: 27, born: '11/07/1996', h: '1m69', club: 'PAOK Salonique', caps: 48, goals: 1, ast: 6, debut: '2013', photo: 'images/players/188133.webp', role: 'Remplaçant', bio: 'Ailier vif et centreur doué.' },
      { id: 'srb23', name: 'Petar RATKOV', pos: 'Attaquant', n: 21, age: 20, born: '15/08/2003', h: '1m93', club: 'RB Salzbourg', caps: 5, goals: 0, ast: 1, debut: '2023', photo: 'images/players/1101942.webp', role: 'Remplaçant', bio: 'Jeune attaquant prometteur de Salzbourg.' }
    ]
  },
  'Croatie': {
    coach: 'Zlatko Dalić', formation: '4-3-3', confederation: 'UEFA', titles: 0,
    players: [
      { id: 'cro1', name: 'Dominik LIVAKOVIĆ', pos: 'Gardien', n: 1, age: 29, born: '09/01/1995', h: '1m88', club: 'Fenerbahçe', caps: 54, goals: 0, ast: 0, debut: '2017', photo: 'images/players/190419.webp', role: 'Titulaire', bio: 'Gardien héroïque de la Coupe du Monde 2022.' },
      { id: 'cro2', name: 'Joško GVARDIOL', pos: 'Défenseur', n: 4, age: 22, born: '23/01/2002', h: '1m85', club: 'Man. City', caps: 30, goals: 2, ast: 1, debut: '2021', photo: 'images/players/tsdb_josko_gvardiol.jpg', role: 'Titulaire', bio: 'L\'un des meilleurs défenseurs de la nouvelle génération.' },
      { id: 'cro3', name: 'Josip ŠUTALO', pos: 'Défenseur', n: 21, age: 24, born: '28/02/2000', h: '1m85', club: 'Ajax', caps: 15, goals: 0, ast: 0, debut: '2022', photo: 'images/players/954836.webp', role: 'Titulaire', bio: 'Défenseur central moderne et technique.' },
      { id: 'cro4', name: 'Josip STANIŠIĆ', pos: 'Défenseur', n: 2, age: 24, born: '02/04/2000', h: '1m87', club: 'Bayern Munich', caps: 18, goals: 0, ast: 1, debut: '2021', photo: 'images/players/tsdb_josip_stanisic.jpg', role: 'Titulaire', bio: 'Latéral polyvalent champion d\'Allemagne.' },
      { id: 'cro5', name: 'Borna SOSA', pos: 'Défenseur', n: 19, age: 26, born: '21/01/1998', h: '1m86', club: 'Torino', caps: 20, goals: 1, ast: 6, debut: '2021', photo: 'images/players/tsdb_borna_sosa.jpg', role: 'Titulaire', bio: 'La patte gauche pour des centres millimétrés.' },
      { id: 'cro6', name: 'Luka MODRIĆ', pos: 'Milieu', n: 10, age: 38, born: '09/09/1985', h: '1m72', club: 'Real Madrid', caps: 178, goals: 26, ast: 29, debut: '2006', photo: 'images/players/tsdb_luka_modric.jpg', role: 'Titulaire', bio: 'Le Maestro éternel, âme de l\'équipe croate.' },
      { id: 'cro7', name: 'Mateo KOVAČIĆ', pos: 'Milieu', n: 8, age: 30, born: '06/05/1994', h: '1m76', club: 'Man. City', caps: 100, goals: 5, ast: 8, debut: '2013', photo: 'images/players/tsdb_mateo_kovacic.jpg', role: 'Titulaire', bio: 'Maître du dribble de rupture au milieu.' },
      { id: 'cro8', name: 'Marcelo BROZOVIĆ', pos: 'Milieu', n: 11, age: 31, born: '11/11/1992', h: '1m81', club: 'Al-Nassr', caps: 99, goals: 7, ast: 7, debut: '2014', photo: 'images/players/tsdb_marcelo_brozovic.jpg', role: 'Titulaire', bio: 'Volume de jeu et endurance marathonienne.' },
      { id: 'cro9', name: 'Andrej KRAMARIĆ', pos: 'Attaquant', n: 9, age: 33, born: '19/06/1991', h: '1m77', club: 'Hoffenheim', caps: 93, goals: 28, ast: 11, debut: '2014', photo: 'images/players/tsdb_andrej_kramaric.jpg', role: 'Titulaire', bio: 'Buteur malin et très expérimenté.' },
      { id: 'cro10', name: 'Ante BUDIMIR', pos: 'Attaquant', n: 16, age: 33, born: '22/07/1991', h: '1m90', club: 'Osasuna', caps: 22, goals: 3, ast: 1, debut: '2020', photo: 'images/players/tsdb_ante_budimir.jpg', role: 'Titulaire', bio: 'Point d\'appui physique et efficace de la tête.' },
      { id: 'cro11', name: 'Ivan PERIŠIĆ', pos: 'Attaquant', n: 14, age: 35, born: '02/02/1989', h: '1m86', club: 'PSV Eindhoven', caps: 131, goals: 33, ast: 30, debut: '2011', photo: 'images/players/38710.webp', role: 'Titulaire', bio: 'L\'expérience et la percussion sur l\'aile.' },
      { id: 'cro12', name: 'Ivica IVUŠIĆ', pos: 'Gardien', n: 23, age: 29, born: '01/02/1995', h: '1m95', club: 'Pafos FC', caps: 6, goals: 0, ast: 0, debut: '2021', photo: 'images/players/tsdb_ivica_ivusic.jpg', role: 'Remplaçant', bio: 'Gardien remplaçant très imposant.' },
      { id: 'cro13', name: 'Nediljko LABROVIĆ', pos: 'Gardien', n: 12, age: 24, born: '10/10/1999', h: '1m96', club: 'Augsbourg', caps: 1, goals: 0, ast: 0, debut: '2024', photo: 'images/players/tsdb_nediljko_labrovic.jpg', role: 'Remplaçant', bio: 'Jeune gardien d\'avenir.' },
      { id: 'cro14', name: 'Domagoj VIDA', pos: 'Défenseur', n: 21, age: 35, born: '29/04/1989', h: '1m84', club: 'AEK Athènes', caps: 105, goals: 4, ast: 1, debut: '2010', photo: 'images/players/51225.webp', role: 'Remplaçant', bio: 'Le guerrier de la défense croate.' },
      { id: 'cro15', name: 'Martin ERLIĆ', pos: 'Défenseur', n: 5, age: 26, born: '24/01/1998', h: '1m93', club: 'Bologne', caps: 9, goals: 0, ast: 1, debut: '2022', photo: 'images/players/789234.webp', role: 'Remplaçant', bio: 'Défenseur central solide évoluant en Serie A.' },
      { id: 'cro16', name: 'Josip JURANOVIĆ', pos: 'Défenseur', n: 22, age: 28, born: '16/08/1995', h: '1m73', club: 'Union Berlin', caps: 37, goals: 0, ast: 5, debut: '2017', photo: 'images/players/tsdb_josip_juranovic.jpg', role: 'Remplaçant', bio: 'Latéral droit rapide et endurant.' },
      { id: 'cro17', name: 'Lovro MAJER', pos: 'Milieu', n: 7, age: 26, born: '17/01/1998', h: '1m78', club: 'Wolfsburg', caps: 30, goals: 8, ast: 5, debut: '2017', photo: 'images/players/tsdb_lovro_majer.jpg', role: 'Remplaçant', bio: 'Milieu offensif créatif et technique.' },
      { id: 'cro18', name: 'Luka IVANUŠEC', pos: 'Milieu', n: 18, age: 25, born: '26/11/1998', h: '1m75', club: 'Feyenoord', caps: 21, goals: 2, ast: 3, debut: '2017', photo: 'images/players/822462.webp', role: 'Remplaçant', bio: 'Polyvalence offensive sur les ailes.' },
      { id: 'cro19', name: 'Mario PAŠALIĆ', pos: 'Milieu', n: 15, age: 29, born: '09/02/1995', h: '1m88', club: 'Atalanta', caps: 62, goals: 10, ast: 4, debut: '2014', photo: 'images/players/190437.webp', role: 'Remplaçant', bio: 'Milieu capable de marquer des buts importants.' },
      { id: 'cro20', name: 'Martin BATURINA', pos: 'Milieu', n: 25, age: 21, born: '16/02/2003', h: '1m72', club: 'Dinamo Zagreb', caps: 3, goals: 0, ast: 0, debut: '2023', photo: 'images/players/1090019.webp', role: 'Remplaçant', bio: 'Le plus grand espoir du football croate.' },
      { id: 'cro21', name: 'Luka SUČIĆ', pos: 'Milieu', n: 25, age: 21, born: '08/09/2002', h: '1m85', club: 'Real Sociedad', caps: 11, goals: 0, ast: 2, debut: '2021', photo: 'images/players/tsdb_luka_sucic.jpg', role: 'Remplaçant', bio: 'Milieu technique à la patte gauche soyeuse.' },
      { id: 'cro22', name: 'Bruno PETKOVIĆ', pos: 'Attaquant', n: 17, age: 29, born: '16/09/1994', h: '1m93', club: 'Dinamo Zagreb', caps: 38, goals: 11, ast: 3, debut: '2019', photo: 'images/players/309306.webp', role: 'Remplaçant', bio: 'Avant-centre puissant et technique.' },
      { id: 'cro23', name: 'Marco PAŠALIĆ', pos: 'Attaquant', n: 26, age: 23, born: '14/09/2000', h: '1m77', club: 'HNK Rijeka', caps: 5, goals: 1, ast: 0, debut: '2023', photo: 'images/players/1066802.webp', role: 'Remplaçant', bio: 'Ailier percutant doté d\'une belle frappe.' }
    ]
  },
  'Écosse': {
    coach: '', players: [
      { id: 'ang23', name: 'Angus GUNN', pos: 'Gardien', n: 1, age: 28, born: '01/01/1996', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_angus_gunn.jpg', role: 'Titulaire', bio: 'Gardien de l\'équipe Écosse.' },
      { id: 'cra24', name: 'Craig GORDON', pos: 'Gardien', n: 12, age: 41, born: '01/01/1983', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_craig_gordon.jpg', role: 'Remplaçant', bio: 'Gardien de l\'équipe Écosse.' },
      { id: 'zan25', name: 'Zander CLARK', pos: 'Gardien', n: 21, age: 31, born: '01/01/1993', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/556366.webp', role: 'Remplaçant', bio: 'Gardien de l\'équipe Écosse.' },
      { id: 'jac26', name: 'Jack HENDRY', pos: 'Défenseur', n: 13, age: 29, born: '01/01/1995', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/795696.webp', role: 'Titulaire', bio: 'Défenseur de l\'équipe Écosse.' },
      { id: 'gra27', name: 'Grant HANLEY', pos: 'Défenseur', n: 5, age: 32, born: '01/01/1992', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_grant_hanley.jpg', role: 'Titulaire', bio: 'Défenseur de l\'équipe Écosse.' },
      { id: 'sco28', name: 'Scott MCKENNA', pos: 'Défenseur', n: 26, age: 27, born: '01/01/1997', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_scott_mckenna.jpg', role: 'Titulaire', bio: 'Défenseur de l\'équipe Écosse.' },
      { id: 'lia29', name: 'Liam COOPER', pos: 'Défenseur', n: 16, age: 32, born: '01/01/1992', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/39327.webp', role: 'Titulaire', bio: 'Défenseur de l\'équipe Écosse.' },
      { id: 'kie30', name: 'Kieran TIERNEY', pos: 'Défenseur', n: 6, age: 27, born: '01/01/1997', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/366592.webp', role: 'Remplaçant', bio: 'Défenseur de l\'équipe Écosse.' },
      { id: 'nat31', name: 'Nathan PATTERSON', pos: 'Défenseur', n: 22, age: 22, born: '01/01/2002', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_nathan_patterson.jpg', role: 'Remplaçant', bio: 'Défenseur de l\'équipe Écosse.' },
      { id: 'aar32', name: 'Aaron HICKEY', pos: 'Défenseur', n: 2, age: 21, born: '01/01/2003', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_aaron_hickey.jpg', role: 'Remplaçant', bio: 'Défenseur de l\'équipe Écosse.' },
      { id: 'cal33', name: 'Callum MCGREGOR', pos: 'Milieu', n: 8, age: 30, born: '01/01/1994', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'https://img.sofascore.com/api/v1/player/822753/image', role: 'Titulaire', bio: 'Milieu de l\'équipe Écosse.' },
      { id: 'bil34', name: 'Billy GILMOUR', pos: 'Milieu', n: 14, age: 23, born: '01/01/2001', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/907668.webp', role: 'Titulaire', bio: 'Milieu de l\'équipe Écosse.' },
      { id: 'rya35', name: 'Ryan JACK', pos: 'Milieu', n: 20, age: 32, born: '01/01/1992', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/35507.webp', role: 'Titulaire', bio: 'Milieu de l\'équipe Écosse.' },
      { id: 'ken36', name: 'Kenny MCLEAN', pos: 'Milieu', n: 23, age: 32, born: '01/01/1992', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/75756.webp', role: 'Remplaçant', bio: 'Milieu de l\'équipe Écosse.' },
      { id: 'stu37', name: 'Stuart ARMSTRONG', pos: 'Milieu', n: 17, age: 32, born: '01/01/1992', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/117083.webp', role: 'Remplaçant', bio: 'Milieu de l\'équipe Écosse.' },
      { id: 'joh38', name: 'John MCGINN', pos: 'Milieu', n: 7, age: 29, born: '01/01/1995', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/250223.webp', role: 'Remplaçant', bio: 'Milieu de l\'équipe Écosse.' },
      { id: 'sco39', name: 'Scott MCTOMINAY', pos: 'Milieu', n: 4, age: 27, born: '01/01/1997', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/879346.webp', role: 'Remplaçant', bio: 'Milieu de l\'équipe Écosse.' },
      { id: 'rya40', name: 'Ryan CHRISTIE', pos: 'Milieu', n: 11, age: 29, born: '01/01/1995', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_ryan_christie.jpg', role: 'Remplaçant', bio: 'Milieu de l\'équipe Écosse.' },
      { id: 'lyn41', name: 'Lyndon DYKES', pos: 'Attaquant', n: 9, age: 28, born: '01/01/1996', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/846204.webp', role: 'Titulaire', bio: 'Attaquant de l\'équipe Écosse.' },
      { id: 'che42', name: 'Che ADAMS', pos: 'Attaquant', n: 10, age: 27, born: '01/01/1997', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_che_adams.jpg', role: 'Titulaire', bio: 'Attaquant de l\'équipe Écosse.' },
      { id: 'law43', name: 'Lawrence SHANKLAND', pos: 'Attaquant', n: 19, age: 28, born: '01/01/1996', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/791092.webp', role: 'Titulaire', bio: 'Attaquant de l\'équipe Écosse.' },
      { id: 'jac44', name: 'Jacob BROWN', pos: 'Attaquant', n: 25, age: 26, born: '01/01/1998', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_jacob_brown.jpg', role: 'Remplaçant', bio: 'Attaquant de l\'équipe Écosse.' },
      { id: 'kev45', name: 'Kevin NISBET', pos: 'Attaquant', n: 24, age: 27, born: '01/01/1997', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/802281.webp', role: 'Remplaçant', bio: 'Attaquant de l\'équipe Écosse.' },
    ]
  },
  'Australie': {
    coach: 'Tony Popovic', formation: '4-3-3', confederation: 'AFC', titles: 0,
    players: [
      { id: 'aus1', name: 'Mathew RYAN', pos: 'Gardien', n: 1, age: 32, born: '08/04/1992', h: '1m84', club: 'AS Roma', caps: 95, goals: 0, ast: 0, debut: '2012', photo: 'images/players/134029.webp', role: 'Titulaire', bio: 'Capitaine et légende des Socceroos.' },
      { id: 'aus2', name: 'Harry SOUTTAR', pos: 'Défenseur', n: 19, age: 25, born: '22/10/1998', h: '2m00', club: 'Sheff Utd', caps: 30, goals: 11, ast: 1, debut: '2019', photo: 'images/players/tsdb_harry_souttar.jpg', role: 'Titulaire', bio: 'Géant défenseur redoutable sur corner.' },
      { id: 'aus3', name: 'Cameron BURGESS', pos: 'Défenseur', n: 21, age: 28, born: '21/10/1995', h: '1m94', club: 'Ipswich Town', caps: 12, goals: 0, ast: 0, debut: '2023', photo: 'images/players/358084.webp', role: 'Titulaire', bio: 'Défenseur solide de Premier League.' },
      { id: 'aus4', name: 'Aziz BEHICH', pos: 'Défenseur', n: 16, age: 33, born: '16/12/1990', h: '1m70', club: 'Melbourne City', caps: 75, goals: 2, ast: 7, debut: '2012', photo: 'images/players/576220.webp', role: 'Titulaire', bio: 'Latéral gauche expérimenté.' },
      { id: 'aus5', name: 'Jordan BOS', pos: 'Défenseur', n: 5, age: 21, born: '29/10/2002', h: '1m80', club: 'Westerlo', caps: 15, goals: 1, ast: 2, debut: '2023', photo: 'images/players/1144138.webp', role: 'Titulaire', bio: 'Grand talent du foot australien.' },
      { id: 'aus6', name: 'Jackson IRVINE', pos: 'Milieu', n: 22, age: 31, born: '07/03/1993', h: '1m89', club: 'St. Pauli', caps: 72, goals: 11, ast: 9, debut: '2013', photo: 'images/players/tsdb_jackson_irvine.jpg', role: 'Titulaire', bio: 'Moteur du milieu et leader charismatique.' },
      { id: 'aus7', name: 'Connor METCALFE', pos: 'Milieu', n: 8, age: 24, born: '05/11/1999', h: '1m83', club: 'St. Pauli', caps: 25, goals: 0, ast: 3, debut: '2021', photo: 'images/players/tsdb_connor_metcalfe.jpg', role: 'Titulaire', bio: 'Milieu créatif évoluant en Allemagne.' },
      { id: 'aus8', name: 'Keanu BACCUS', pos: 'Milieu', n: 20, age: 26, born: '07/06/1998', h: '1m78', club: 'Mansfield Town', caps: 20, goals: 1, ast: 1, debut: '2022', photo: 'images/players/864230.webp', role: 'Titulaire', bio: 'Milieu récupérateur dynamique.' },
      { id: 'aus9', name: 'Craig GOODWIN', pos: 'Attaquant', n: 23, age: 32, born: '16/12/1991', h: '1m75', club: 'Al-Wehda', caps: 30, goals: 6, ast: 12, debut: '2013', photo: 'images/players/220113.webp', role: 'Titulaire', bio: 'Spécialiste des centres et des CPA.' },
      { id: 'aus10', name: 'Mitchell DUKE', pos: 'Attaquant', n: 15, age: 33, born: '18/01/1991', h: '1m86', club: 'Machida Zelvia', caps: 40, goals: 12, ast: 2, debut: '2013', photo: 'images/players/146970.webp', role: 'Titulaire', bio: 'Attaquant de pointe physique.' },
      { id: 'aus11', name: 'Martin BOYLE', pos: 'Attaquant', n: 6, age: 31, born: '25/04/1993', h: '1m72', club: 'Hibernian', caps: 30, goals: 9, ast: 8, debut: '2018', photo: 'images/players/214308.webp', role: 'Titulaire', bio: 'Ailier percutant et rapide.' },
      { id: 'aus12', name: 'Andrew REDMAYNE', pos: 'Gardien', n: 12, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/32071.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Australie.' },
      { id: 'aus13', name: 'Danny VUKOVIC', pos: 'Défenseur', n: 13, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/24676.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Australie.' },
      { id: 'aus14', name: 'Milos DEGENEK', pos: 'Défenseur', n: 14, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/155961.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Australie.' },
      { id: 'aus15', name: 'Bailey WRIGHT', pos: 'Défenseur', n: 15, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/113955.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Australie.' },
      { id: 'aus16', name: 'Thomas DENG', pos: 'Défenseur', n: 16, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'https://img.sofascore.com/api/v1/player/572528/image', role: 'Remplaçant', bio: 'Joueur clé de la sélection Australie.' },
      { id: 'aus17', name: 'Fran KARAČIĆ', pos: 'Milieu', n: 17, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/798879.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Australie.' },
      { id: 'aus18', name: 'Nathaniel ATKINSON', pos: 'Milieu', n: 18, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_nathaniel_atkinson.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Australie.' },
      { id: 'aus19', name: 'Joel KING', pos: 'Milieu', n: 19, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/944055.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Australie.' },
      { id: 'aus20', name: 'Keanu BACCUS', pos: 'Milieu', n: 20, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/864230.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Australie.' },
      { id: 'aus21', name: 'Cameron DEVLIN', pos: 'Attaquant', n: 21, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/358084.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Australie.' },
      { id: 'aus22', name: 'Awer MABIL', pos: 'Attaquant', n: 22, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/307082.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Australie.' },
      { id: 'aus23', name: 'Jamie MACLAREN', pos: 'Attaquant', n: 23, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/333143.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Australie.' }
    ]
  },
  'Slovaquie': {
    coach: '', players: [
      { id: 'mx1', name: 'Luis MALAGÓN', pos: 'Gardien', n: 1, age: 27, born: '02/03/1997', h: '1m82', club: 'Club América', caps: 15, goals: 0, ast: 0, debut: '2021', photo: 'images/players/tsdb_luis_malagon.jpg', role: 'Titulaire', bio: 'Nouveau numéro 1 du Mexique.' },
      { id: 'mx2', name: 'César MONTES', pos: 'Défenseur', n: 3, age: 27, born: '24/02/1997', h: '1m91', club: 'Lokomotiv Moscou', caps: 48, goals: 1, ast: 0, debut: '2019', photo: 'images/players/818406.webp', role: 'Titulaire', bio: 'Roc défensif évoluant en Russie.' },
      { id: 'mx3', name: 'Johan VÁSQUEZ', pos: 'Défenseur', n: 5, age: 25, born: '22/10/1998', h: '1m87', club: 'Genoa', caps: 28, goals: 1, ast: 0, debut: '2021', photo: 'images/players/889785.webp', role: 'Titulaire', bio: 'Défenseur central établi en Serie A.' },
      { id: 'mx4', name: 'Jorge SÁNCHEZ', pos: 'Défenseur', n: 2, age: 26, born: '10/12/1997', h: '1m78', club: 'Cruz Azul', caps: 45, goals: 1, ast: 4, debut: '2019', photo: 'images/players/832868.webp', role: 'Titulaire', bio: 'Latéral droit d\'expérience.' },
      { id: 'mx5', name: 'Jesús GALLARDO', pos: 'Défenseur', n: 23, age: 30, born: '15/08/1994', h: '1m76', club: 'Toluca', caps: 100, goals: 2, ast: 10, debut: '2016', photo: 'images/players/770253.webp', role: 'Titulaire', bio: 'Centenaire en sélection.' },
      { id: 'mx6', name: 'Edson ÁLVAREZ', pos: 'Milieu', n: 4, age: 26, born: '24/10/1997', h: '1m87', club: 'West Ham', caps: 80, goals: 5, ast: 4, debut: '2017', photo: 'images/players/847151.webp', role: 'Titulaire', bio: 'Le Machín, patron du milieu.' },
      { id: 'mx7', name: 'Luis CHÁVEZ', pos: 'Milieu', n: 18, age: 28, born: '15/01/1996', h: '1m78', club: 'Dynamo Moscou', caps: 35, goals: 4, ast: 5, debut: '2022', photo: 'https://img.sofascore.com/api/v1/player/1638685/image', role: 'Titulaire', bio: 'Spécialiste des coups de pied arrêtés.' },
      { id: 'mx8', name: 'Orbelín PINEDA', pos: 'Milieu', n: 17, age: 28, born: '24/03/1996', h: '1m69', club: 'AEK Athènes', caps: 70, goals: 10, ast: 12, debut: '2016', photo: 'images/players/850404.webp', role: 'Titulaire', bio: 'Milieu créatif polyvalent.' },
      { id: 'mx9', name: 'Hirving LOZANO', pos: 'Attaquant', n: 22, age: 29, born: '30/07/1995', h: '1m75', club: 'PSV', caps: 74, goals: 18, ast: 15, debut: '2016', photo: 'images/players/tsdb_hirving_lozano.jpg', role: 'Titulaire', bio: 'L\'ailier électrique du PSV.' },
      { id: 'mx10', name: 'Santiago GIMÉNEZ', pos: 'Attaquant', n: 11, age: 23, born: '18/04/2001', h: '1m82', club: 'Feyenoord', caps: 32, goals: 8, ast: 4, debut: '2021', photo: 'images/players/tsdb_santiago_gimenez.jpg', role: 'Titulaire', bio: 'Le buteur providentiel du Mexique.' },
      { id: 'mx11', name: 'Raúl JIMÉNEZ', pos: 'Attaquant', n: 9, age: 33, born: '05/05/1991', h: '1m88', club: 'Fulham', caps: 106, goals: 34, ast: 15, debut: '2013', photo: 'images/players/tsdb_raul_jimenez.jpg', role: 'Titulaire', bio: 'L\'expert de la Premier League.' },
      { id: 'mx12', name: 'Orbelín PINEDA', pos: 'Milieu', n: 17, age: 28, born: '24/03/1996', h: '1m69', club: 'AEK Athènes', caps: 68, goals: 10, ast: 12, debut: '2016', photo: 'images/players/850404.webp', role: 'Remplaçant', bio: 'Milieu créatif et dynamique.' },
      { id: 'mx13', name: 'Carlos RODRÍGUEZ', pos: 'Milieu', n: 8, age: 27, born: '03/01/1997', h: '1m74', club: 'Cruz Azul', caps: 52, goals: 0, ast: 6, debut: '2019', photo: 'images/players/845849.webp', role: 'Remplaçant', bio: 'Milieu technique.' },
      { id: 'mx14', name: 'Marcel RUIZ', pos: 'Milieu', n: 14, age: 23, born: '26/10/2000', h: '1m79', club: 'Toluca', caps: 5, goals: 0, ast: 1, debut: '2023', photo: 'images/players/942167.webp', role: 'Remplaçant', bio: 'Grand espoir au milieu.' },
      { id: 'mx15', name: 'Roberto ALVARADO', pos: 'Milieu', n: 25, age: 25, born: '07/09/1998', h: '1m76', club: 'Chivas', caps: 45, goals: 5, ast: 8, debut: '2018', photo: 'images/players/tsdb_roberto_alvarado.jpg', role: 'Remplaçant', bio: 'Polyvalent sur les côtés.' },
      { id: 'mx16', name: 'Santiago GIMÉNEZ', pos: 'Attaquant', n: 11, age: 23, born: '18/04/2001', h: '1m82', club: 'Feyenoord', caps: 30, goals: 8, ast: 4, debut: '2021', photo: 'images/players/tsdb_santiago_gimenez.jpg', role: 'Remplaçant', bio: 'Le grand espoir de l\'attaque mexicaine.' },
      { id: 'mx17', name: 'Raúl JIMÉNEZ', pos: 'Attaquant', n: 9, age: 33, born: '05/05/1991', h: '1m88', club: 'Fulham', caps: 105, goals: 33, ast: 14, debut: '2013', photo: 'images/players/tsdb_raul_jimenez.jpg', role: 'Remplaçant', bio: 'Attaquant expérimenté de Premier League.' },
      { id: 'mx18', name: 'Hirving LOZANO', pos: 'Attaquant', n: 22, age: 28, born: '30/07/1995', h: '1m74', club: 'San Diego FC', caps: 70, goals: 18, ast: 15, debut: '2016', photo: 'images/players/tsdb_hirving_lozano.jpg', role: 'Remplaçant', bio: 'Le Chucky, danger permanent sur l\'aile.' },
      { id: 'mx19', name: 'Julián QUIÑONES', pos: 'Attaquant', n: 33, age: 27, born: '24/03/1997', h: '1m80', club: 'Al-Qadsiah', caps: 10, goals: 2, ast: 1, debut: '2023', photo: 'images/players/tsdb_julian_quinones.jpg', role: 'Remplaçant', bio: 'Attaquant puissant et rapide.' },
      { id: 'mx20', name: 'César HUERTA', pos: 'Attaquant', n: 12, age: 23, born: '03/12/2000', h: '1m74', club: 'Pumas UNAM', caps: 12, goals: 2, ast: 2, debut: '2023', photo: 'images/players/tsdb_cesar_huerta.jpg', role: 'Remplaçant', bio: 'Le Chino, nouvelle sensation.' },
      { id: 'mx21', name: 'Alexis VEGA', pos: 'Attaquant', n: 10, age: 26, born: '25/11/1997', h: '1m73', club: 'Toluca', caps: 30, goals: 6, ast: 5, debut: '2019', photo: 'images/players/815637.webp', role: 'Remplaçant', bio: 'Attaquant technique et finisseur.' },
      { id: 'mx22', name: 'Uriel ANTUNA', pos: 'Attaquant', n: 15, age: 26, born: '21/08/1997', h: '1m74', club: 'Cruz Azul', caps: 60, goals: 13, ast: 10, debut: '2019', photo: 'images/players/843198.webp', role: 'Remplaçant', bio: 'Ailier de débordement.' },
      { id: 'mx23', name: 'Henry MARTÍN', pos: 'Attaquant', n: 21, age: 31, born: '18/11/1992', h: '1m78', club: 'América', caps: 45, goals: 9, ast: 3, debut: '2015', photo: 'images/players/755408.webp', role: 'Remplaçant', bio: 'Buteur opportuniste de l\'América.' }
    ]
  },
  "Côte d'Ivoire": {
    coach: 'Emerse Faé', formation: '4-3-3', confederation: 'CAF', titles: 3,
    players: []
  },
  'Curaçao': {
    coach: 'Dick Advocaat', formation: '4-3-3', confederation: 'CONCACAF', titles: 0,
    players: [
      { id: 'cuw1', name: 'Eloy ROOM', pos: 'Gardien', n: 1, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/40859.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Curaçao.' },
      { id: 'cuw2', name: 'Cuco MARTINA', pos: 'Défenseur', n: 2, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/73763.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Curaçao.' },
      { id: 'cuw3', name: 'Juriën GAARI', pos: 'Défenseur', n: 3, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_jurien_gaari.jpg', role: 'Titulaire', bio: 'Joueur clé de la sélection Curaçao.' },
      { id: 'cuw4', name: 'Leandro BACUNA', pos: 'Défenseur', n: 4, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/74545.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Curaçao.' },
      { id: 'cuw5', name: 'Vurnon ANITA', pos: 'Défenseur', n: 5, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/15007.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Curaçao.' },
      { id: 'cuw6', name: 'Brandley KUWAS', pos: 'Milieu', n: 6, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_brandley_kuwas.jpg', role: 'Titulaire', bio: 'Joueur clé de la sélection Curaçao.' },
      { id: 'cuw7', name: 'Roly BONEVACIA', pos: 'Milieu', n: 7, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/123982.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Curaçao.' },
      { id: 'cuw8', name: 'Juninho BACUNA', pos: 'Milieu', n: 8, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_juninho_bacuna.jpg', role: 'Titulaire', bio: 'Joueur clé de la sélection Curaçao.' },
      { id: 'cuw9', name: 'Rangelo JANGA', pos: 'Attaquant', n: 9, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/128791.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Curaçao.' },
      { id: 'cuw10', name: 'Kenji GORRÉ', pos: 'Attaquant', n: 10, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/796142.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Curaçao.' },
      { id: 'cuw11', name: 'Richairo ŽIVKOVIĆ', pos: 'Attaquant', n: 11, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/295137.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Curaçao.' },
      { id: 'cuw12', name: 'Tyrick BODAK', pos: 'Gardien', n: 12, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1049270.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Curaçao.' },
      { id: 'cuw13', name: 'Jean-Marc ANTERSIGN', pos: 'Défenseur', n: 13, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/920469.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Curaçao.' },
      { id: 'cuw14', name: 'Darryl LACHMAN', pos: 'Défenseur', n: 14, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/43462.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Curaçao.' },
      { id: 'cuw15', name: 'Sherel FLORANUS', pos: 'Défenseur', n: 15, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/803021.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Curaçao.' },
      { id: 'cuw16', name: 'Roshon VAN EIJSMA', pos: 'Défenseur', n: 16, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/925930.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Curaçao.' },
      { id: 'cuw17', name: 'Nathangelo MARKELO', pos: 'Milieu', n: 17, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/920489.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Curaçao.' },
      { id: 'cuw18', name: 'Godfried ROEMERATOE', pos: 'Milieu', n: 18, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/825849.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Curaçao.' },
      { id: 'cuw19', name: 'Kevin FELIDA', pos: 'Milieu', n: 19, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/896215.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Curaçao.' },
      { id: 'cuw20', name: 'Xander SEVERINA', pos: 'Milieu', n: 20, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tm_xander_severina.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Curaçao.' },
      { id: 'cuw21', name: 'Jeremy ANTONISSE', pos: 'Attaquant', n: 21, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1092638.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Curaçao.' },
      { id: 'cuw22', name: 'Jearl MARGARITHA', pos: 'Attaquant', n: 22, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1036004.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Curaçao.' },
      { id: 'cuw23', name: 'Gervane KASTANEER', pos: 'Attaquant', n: 23, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/798178.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Curaçao.' }
    ]
  },
  'Tunisie': {
    coach: 'Kais Yaâkoubi', formation: '4-3-3', confederation: 'CAF', titles: 0,
    players: [
      { id: 'tun1', name: 'Aymen DAHMEN', pos: 'Gardien', n: 1, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1198374.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Tunisie.' },
      { id: 'tun2', name: 'Montassar TALBI', pos: 'Défenseur', n: 2, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_montassar_talbi.jpg', role: 'Titulaire', bio: 'Joueur clé de la sélection Tunisie.' },
      { id: 'tun3', name: 'Yassine MERIAH', pos: 'Défenseur', n: 3, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'https://img.sofascore.com/api/v1/player/1094538/image', role: 'Titulaire', bio: 'Joueur clé de la sélection Tunisie.' },
      { id: 'tun4', name: 'Ali MAÂLOUL', pos: 'Défenseur', n: 4, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/332547.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Tunisie.' },
      { id: 'tun5', name: 'Mohamed DRÄGER', pos: 'Défenseur', n: 5, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/359388.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Tunisie.' },
      { id: 'tun6', name: 'Aïssa LAÏDOUNI', pos: 'Milieu', n: 6, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_aissa_laidouni.jpg', role: 'Titulaire', bio: 'Joueur clé de la sélection Tunisie.' },
      { id: 'tun7', name: 'Ellyes SKHIRI', pos: 'Milieu', n: 7, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/591706.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Tunisie.' },
      { id: 'tun8', name: 'Hannibal MEJBRI', pos: 'Milieu', n: 8, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1009386.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Tunisie.' },
      { id: 'tun9', name: 'Wahbi KHAZRI', pos: 'Attaquant', n: 9, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/51640.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Tunisie.' },
      { id: 'tun10', name: 'Youssef MSAKNI', pos: 'Attaquant', n: 10, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_youssef_msakni.jpg', role: 'Titulaire', bio: 'Joueur clé de la sélection Tunisie.' },
      { id: 'tun11', name: 'Issam JEBALI', pos: 'Attaquant', n: 11, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/793187.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Tunisie.' },
      { id: 'tun12', name: 'Bechir BEN SAÏD', pos: 'Gardien', n: 12, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/967309.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Tunisie.' },
      { id: 'tun13', name: 'Mouez HASSEN', pos: 'Défenseur', n: 13, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/227860.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Tunisie.' },
      { id: 'tun14', name: 'Nader GHANDRI', pos: 'Défenseur', n: 14, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/347028.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Tunisie.' },
      { id: 'tun15', name: 'Dylan BRONN', pos: 'Défenseur', n: 15, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_dylan_bronn.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Tunisie.' },
      { id: 'tun16', name: 'Wajdi KECHRIDA', pos: 'Défenseur', n: 16, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/880061.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Tunisie.' },
      { id: 'tun17', name: 'Ali ABDI', pos: 'Milieu', n: 17, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/919027.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Tunisie.' },
      { id: 'tun18', name: 'Ghaylène CHAALALI', pos: 'Milieu', n: 18, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/898740.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Tunisie.' },
      { id: 'tun19', name: 'Mohamed Ali BEN ROMDHANE', pos: 'Milieu', n: 19, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/966891.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Tunisie.' },
      { id: 'tun20', name: 'Aymen DAHMEN2', pos: 'Milieu', n: 20, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1198374.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Tunisie.' },
      { id: 'tun21', name: 'Saîf-Eddine KHAOUI', pos: 'Attaquant', n: 21, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/346262.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Tunisie.' },
      { id: 'tun22', name: 'Naïm SLITI', pos: 'Attaquant', n: 22, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/153158.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Tunisie.' },
      { id: 'tun23', name: 'Seifeddine JAZIRI', pos: 'Attaquant', n: 23, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/918996.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Tunisie.' }
    ]
  },
  'Pérou': {
    coach: 'Jorge Fossati', formation: '4-3-3', confederation: 'CONMEBOL', titles: 0,
    players: [
      { id: 'per1', name: 'Pedro GALLESE', pos: 'Gardien', n: 1, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_pedro_gallese.jpg', role: 'Titulaire', bio: 'Joueur clé de la sélection Pérou.' },
      { id: 'per2', name: 'Carlos ZAMBRANO', pos: 'Défenseur', n: 2, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/31611.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Pérou.' },
      { id: 'per3', name: 'Alexander CALLENS', pos: 'Défenseur', n: 3, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/331575.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Pérou.' },
      { id: 'per4', name: 'Luis ADVÍNCULA', pos: 'Défenseur', n: 4, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_luis_advincula.jpg', role: 'Titulaire', bio: 'Joueur clé de la sélection Pérou.' },
      { id: 'per5', name: 'Miguel TRAUCO', pos: 'Défenseur', n: 5, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_miguel_trauco.jpg', role: 'Titulaire', bio: 'Joueur clé de la sélection Pérou.' },
      { id: 'per6', name: 'Renato TAPIA', pos: 'Milieu', n: 6, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_renato_tapia.jpg', role: 'Titulaire', bio: 'Joueur clé de la sélection Pérou.' },
      { id: 'per7', name: 'Yoshimar YOTÚN', pos: 'Milieu', n: 7, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/46988.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Pérou.' },
      { id: 'per8', name: 'Christian CUEVA', pos: 'Milieu', n: 8, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/47447.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Pérou.' },
      { id: 'per9', name: 'André CARRILLO', pos: 'Attaquant', n: 9, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_andre_carrillo.jpg', role: 'Titulaire', bio: 'Joueur clé de la sélection Pérou.' },
      { id: 'per10', name: 'Gianluca LAPADULA', pos: 'Attaquant', n: 10, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_gianluca_lapadula.jpg', role: 'Titulaire', bio: 'Joueur clé de la sélection Pérou.' },
      { id: 'per11', name: 'Edison FLORES', pos: 'Attaquant', n: 11, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_edison_flores.jpg', role: 'Titulaire', bio: 'Joueur clé de la sélection Pérou.' },
      { id: 'per12', name: 'José CARVALLO', pos: 'Gardien', n: 12, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/46984.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Pérou.' },
      { id: 'per13', name: 'Angelo CAMPOS', pos: 'Défenseur', n: 13, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/876932.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Pérou.' },
      { id: 'per14', name: 'Luis ABRAM', pos: 'Défenseur', n: 14, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/790031.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Pérou.' },
      { id: 'per15', name: 'Miguel ARAÚJO', pos: 'Défenseur', n: 15, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'https://img.sofascore.com/api/v1/player/333373/image', role: 'Remplaçant', bio: 'Joueur clé de la sélection Pérou.' },
      { id: 'per16', name: 'Marcos LÓPEZ', pos: 'Défenseur', n: 16, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_marcos_lopez.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Pérou.' },
      { id: 'per17', name: 'Aldo CORZO', pos: 'Milieu', n: 17, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/47401.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Pérou.' },
      { id: 'per18', name: 'Pedro AQUINO', pos: 'Milieu', n: 18, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/312284.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Pérou.' },
      { id: 'per19', name: 'Wilder CARTAGENA', pos: 'Milieu', n: 19, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/378808.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Pérou.' },
      { id: 'per20', name: 'Sergio PEÑA', pos: 'Milieu', n: 20, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_sergio_pena.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Pérou.' },
      { id: 'per21', name: 'Christofer GONZÁLES', pos: 'Attaquant', n: 21, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/345779.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Pérou.' },
      { id: 'per22', name: 'Alex VALERA', pos: 'Attaquant', n: 22, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1016972.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Pérou.' },
      { id: 'per23', name: 'Santiago ORMEÑO', pos: 'Attaquant', n: 23, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/942097.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Pérou.' }
    ]
  },
  'Sénégal': {
    coach: 'Pape Thiaw', formation: '4-3-3', confederation: 'CAF', titles: 0,
    players: [
      { id: 'sen1', name: 'Edouard MENDY', pos: 'Gardien', n: 16, age: 32, born: '01/03/1992', h: '1m94', club: 'Al-Ahli', caps: 35, goals: 0, ast: 0, debut: '2018', photo: 'images/players/845074.webp', role: 'Titulaire', bio: 'Gardien vainqueur de la CAN.' },
      { id: 'sen2', name: 'Kalidou KOULIBALY', pos: 'Défenseur', n: 3, age: 33, born: '20/06/1991', h: '1m86', club: 'Al-Hilal', caps: 80, goals: 1, ast: 2, debut: '2015', photo: 'images/players/126071.webp', role: 'Titulaire', bio: 'Capitaine emblématique du Sénégal.' },
      { id: 'sen3', name: 'Moussa NIAKHATÉ', pos: 'Défenseur', n: 19, age: 28, born: '08/03/1996', h: '1m90', club: 'Lyon', caps: 10, goals: 0, ast: 0, debut: '2022', photo: 'images/players/tsdb_moussa_niakhate.jpg', role: 'Titulaire', bio: 'Défenseur solide de l\'OL.' },
      { id: 'sen4', name: 'Abdou DIALLO', pos: 'Défenseur', n: 22, age: 28, born: '04/05/1996', h: '1m87', club: 'Al-Arabi', caps: 30, goals: 2, ast: 1, debut: '2021', photo: 'https://img.sofascore.com/api/v1/player/802159/image', role: 'Titulaire', bio: 'Défenseur polyvalent passé par le PSG.' },
      { id: 'sen5', name: 'Ismail JAKOBS', pos: 'Défenseur', n: 14, age: 24, born: '17/08/1999', h: '1m84', club: 'Galatasaray', caps: 18, goals: 0, ast: 3, debut: '2022', photo: 'images/players/897291.webp', role: 'Titulaire', bio: 'Latéral gauche rapide de Galatasaray.' },
      { id: 'sen6', name: 'Idrissa GUEYE', pos: 'Milieu', n: 5, age: 34, born: '26/09/1989', h: '1m74', club: 'Everton', caps: 110, goals: 7, ast: 5, debut: '2011', photo: 'images/players/tsdb_idrissa_gueye.jpg', role: 'Titulaire', bio: 'Moteur infatigable du milieu sénégalais.' },
      { id: 'sen7', name: 'Pape Matar SARR', pos: 'Milieu', n: 17, age: 21, born: '14/09/2002', h: '1m84', club: 'Tottenham', caps: 20, goals: 1, ast: 2, debut: '2021', photo: 'images/players/1002711.webp', role: 'Titulaire', bio: 'Jeune prodige évoluant chez les Spurs.' },
      { id: 'sen8', name: 'Lamine CAMARA', pos: 'Milieu', n: 25, age: 20, born: '01/01/2004', h: '1m73', club: 'Monaco', caps: 8, goals: 3, ast: 2, debut: '2023', photo: 'images/players/1389846.webp', role: 'Titulaire', bio: 'Meilleur jeune joueur africain 2023.' },
      { id: 'sen9', name: 'Sadio MANÉ', pos: 'Attaquant', n: 10, age: 32, born: '10/04/1992', h: '1m74', club: 'Al-Nassr', caps: 105, goals: 43, ast: 25, debut: '2012', photo: 'images/players/217704.webp', role: 'Titulaire', bio: 'Meilleur buteur de l\'histoire du Sénégal.' },
      { id: 'sen10', name: 'Ismaïla SARR', pos: 'Attaquant', n: 18, age: 26, born: '25/02/1998', h: '1m85', club: 'Crystal Palace', caps: 60, goals: 13, ast: 10, debut: '2016', photo: 'images/players/845286.webp', role: 'Titulaire', bio: 'Ailier percutant de Premier League.' },
      { id: 'sen11', name: 'Nicolas JACKSON', pos: 'Attaquant', n: 7, age: 23, born: '20/06/2001', h: '1m86', club: 'Chelsea', caps: 12, goals: 0, ast: 2, debut: '2022', photo: 'images/players/1085381.webp', role: 'Titulaire', bio: 'Avant-centre titulaire à Chelsea.' },
      { id: 'sen12', name: 'Seny DIENG', pos: 'Gardien', n: 12, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_seny_dieng.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Sénégal.' },
      { id: 'sen13', name: 'Mory DIAW', pos: 'Défenseur', n: 13, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/580226.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Sénégal.' },
      { id: 'sen14', name: 'Moussa NIAKHATÉ', pos: 'Défenseur', n: 14, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_moussa_niakhate.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Sénégal.' },
      { id: 'sen15', name: 'Abdoulaye SECK', pos: 'Défenseur', n: 15, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/583896.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Sénégal.' },
      { id: 'sen16', name: 'Formose MENDY', pos: 'Défenseur', n: 16, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_formose_mendy.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Sénégal.' },
      { id: 'sen17', name: 'Fodé BALLO-TOURÉ', pos: 'Milieu', n: 17, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_fode_ballo_toure.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Sénégal.' },
      { id: 'sen18', name: 'Pathé CISS', pos: 'Milieu', n: 18, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_pathe_ciss.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Sénégal.' },
      { id: 'sen19', name: 'Cheikhou KOUYATÉ', pos: 'Milieu', n: 19, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/45944.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Sénégal.' },
      { id: 'sen20', name: 'Lamine CAMARA', pos: 'Milieu', n: 20, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1389846.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Sénégal.' },
      { id: 'sen21', name: 'Krépin DIATTA', pos: 'Attaquant', n: 21, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_krepin_diatta.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Sénégal.' },
      { id: 'sen22', name: 'Iliman NDIAYE', pos: 'Attaquant', n: 22, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_iliman_ndiaye.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Sénégal.' },
      { id: 'sen23', name: 'Nicolas JACKSON', pos: 'Attaquant', n: 23, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1085381.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Sénégal.' }
    ]
  },
  'Égypte': {
    coach: 'Hossam Hassan', formation: '4-3-3', confederation: 'CAF', titles: 0,
    players: [
      { id: 'egy1', name: 'Mohamed EL SHENAWY', pos: 'Gardien', n: 1, age: 35, born: '18/12/1988', h: '1m91', club: 'Al-Ahly', caps: 55, goals: 0, ast: 0, debut: '2018', photo: 'images/players/tsdb_mohamed_el_shenawy.jpg', role: 'Titulaire', bio: 'Gardien expérimenté d\'Al-Ahly.' },
      { id: 'egy2', name: 'Mohamed ABDELMONEM', pos: 'Défenseur', n: 24, age: 25, born: '01/02/1999', h: '1m85', club: 'Nice', caps: 25, goals: 2, ast: 0, debut: '2021', photo: 'images/players/tsdb_mohamed_abdelmonem.jpg', role: 'Titulaire', bio: 'Défenseur central talentueux de l\'OGC Nice.' },
      { id: 'egy3', name: 'Ahmed HEGAZY', pos: 'Défenseur', n: 6, age: 33, born: '25/01/1991', h: '1m93', club: 'NEOM SC', caps: 85, goals: 2, ast: 1, debut: '2011', photo: 'images/players/159653.webp', role: 'Titulaire', bio: 'Roc défensif et leader.' },
      { id: 'egy4', name: 'Mohamed HANY', pos: 'Défenseur', n: 3, age: 28, born: '25/01/1996', h: '1m80', club: 'Al-Ahly', caps: 20, goals: 0, ast: 3, debut: '2016', photo: 'images/players/tsdb_mohamed_hany.jpg', role: 'Titulaire', bio: 'Latéral droit régulier.' },
      { id: 'egy5', name: 'Ahmed FOTOUH', pos: 'Défenseur', n: 13, age: 26, born: '22/03/1998', h: '1m75', club: 'Zamalek', caps: 25, goals: 1, ast: 4, debut: '2019', photo: 'images/players/tm_ahmed_fotouh.jpg', role: 'Titulaire', bio: 'Latéral gauche offensif.' },
      { id: 'egy6', name: 'Hamdi FATHI', pos: 'Milieu', n: 5, age: 29, born: '29/09/1994', h: '1m80', club: 'Al-Wakrah', caps: 40, goals: 3, ast: 1, debut: '2019', photo: 'images/players/tm_hamdi_fathi.jpg', role: 'Titulaire', bio: 'Milieu récupérateur infatigable.' },
      { id: 'egy7', name: 'Marwan ATTIA', pos: 'Milieu', n: 14, age: 25, born: '01/08/1998', h: '1m78', club: 'Al-Ahly', caps: 15, goals: 0, ast: 2, debut: '2023', photo: 'images/players/tm_marwan_attia.jpg', role: 'Titulaire', bio: 'Révélation du milieu égyptien.' },
      { id: 'egy8', name: 'Mahmoud TRÉZÉGUET', pos: 'Milieu', n: 7, age: 29, born: '01/10/1994', h: '1m79', club: 'Al-Rayyan', caps: 70, goals: 16, ast: 9, debut: '2014', photo: 'https://img.sofascore.com/api/v1/player/295361/image', role: 'Titulaire', bio: 'Milieu offensif décisif.' },
      { id: 'egy9', name: 'Mohamed SALAH', pos: 'Attaquant', n: 10, age: 32, born: '15/06/1992', h: '1m75', club: 'Liverpool', caps: 98, goals: 56, ast: 32, debut: '2011', photo: 'images/players/tsdb_mohamed_salah.jpg', role: 'Titulaire', bio: 'Légende vivante de Liverpool et de l\'Égypte.' },
      { id: 'egy10', name: 'Omar MARMOUSH', pos: 'Attaquant', n: 22, age: 25, born: '07/02/1999', h: '1m83', club: 'Frankfurt', caps: 30, goals: 5, ast: 6, debut: '2021', photo: 'images/players/873554.webp', role: 'Titulaire', bio: 'Attaquant vedette de Bundesliga.' },
      { id: 'egy11', name: 'Mostafa MOHAMED', pos: 'Attaquant', n: 19, age: 26, born: '28/11/1997', h: '1m85', club: 'FC Nantes', caps: 35, goals: 12, ast: 3, debut: '2019', photo: 'images/players/tsdb_mostafa_mohamed.jpg', role: 'Titulaire', bio: 'Le bulldozer nantais.' },
      { id: 'egy12', name: 'Gabaski ABOU GABAL', pos: 'Gardien', n: 12, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tm_gabaski_abou_gabal.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Égypte.' },
      { id: 'egy13', name: 'Mohamed SOBHY', pos: 'Défenseur', n: 13, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/32786.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Égypte.' },
      { id: 'egy14', name: 'Ali GABR', pos: 'Défenseur', n: 14, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/804430.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Égypte.' },
      { id: 'egy15', name: 'Yasser IBRAHIM', pos: 'Défenseur', n: 15, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'https://img.sofascore.com/api/v1/player/333441/image', role: 'Remplaçant', bio: 'Joueur clé de la sélection Égypte.' },
      { id: 'egy16', name: 'Omar KAMAL', pos: 'Défenseur', n: 16, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tm_omar_kamal.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Égypte.' },
      { id: 'egy17', name: 'Mohamed HAMDY', pos: 'Milieu', n: 17, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/159659.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Égypte.' },
      { id: 'egy18', name: 'Mahmoud HAMADA', pos: 'Milieu', n: 18, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/918621.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Égypte.' },
      { id: 'egy19', name: 'Ahmed ZIZO', pos: 'Milieu', n: 19, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1608434.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Égypte.' },
      { id: 'egy20', name: 'Marwan ATTIA', pos: 'Milieu', n: 20, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tm_marwan_attia.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Égypte.' },
      { id: 'egy21', name: 'Omar MARMOUSH', pos: 'Attaquant', n: 21, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/873554.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Égypte.' },
      { id: 'egy22', name: 'Ahmed KOKA', pos: 'Attaquant', n: 22, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'https://img.sofascore.com/api/v1/player/1092709/image', role: 'Remplaçant', bio: 'Joueur clé de la sélection Égypte.' },
      { id: 'egy23', name: 'Mahmoud KAHRABA', pos: 'Attaquant', n: 23, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/333439.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Égypte.' }
    ]
  },
  'Iran': {
    coach: 'Amir Ghalenoei', formation: '4-3-3', confederation: 'AFC', titles: 0,
    players: [
      { id: 'irn1', name: 'Alireza BEIRANVAND', pos: 'Gardien', n: 1, age: 31, born: '21/09/1992', h: '1m94', club: 'Tractor SC', caps: 70, goals: 0, ast: 0, debut: '2015', photo: 'images/players/791374.webp', role: 'Titulaire', bio: 'Gardien célèbre pour ses relances à la main records.' },
      { id: 'irn2', name: 'Shojae KHALILZADEH', pos: 'Défenseur', n: 4, age: 35, born: '14/05/1989', h: '1m82', club: 'Tractor SC', caps: 35, goals: 2, ast: 0, debut: '2012', photo: 'images/players/223340.webp', role: 'Titulaire', bio: 'Défenseur central d\'expérience.' },
      { id: 'irn3', name: 'Hossein KANAANI', pos: 'Défenseur', n: 13, age: 30, born: '23/03/1994', h: '1m88', club: 'Persepolis', caps: 50, goals: 4, ast: 1, debut: '2015', photo: 'images/players/812952.webp', role: 'Titulaire', bio: 'Le pilier de la défense du Persepolis.' },
      { id: 'irn4', name: 'Ramin REZAEIAN', pos: 'Défenseur', n: 23, age: 34, born: '21/03/1990', h: '1m81', club: 'Esteghlal', caps: 65, goals: 6, ast: 10, debut: '2015', photo: 'images/players/786133.webp', role: 'Titulaire', bio: 'Latéral droit très offensif.' },
      { id: 'irn5', name: 'Milad MOHAMMADI', pos: 'Défenseur', n: 5, age: 30, born: '29/09/1993', h: '1m78', club: 'Persepolis', caps: 60, goals: 1, ast: 4, debut: '2015', photo: 'images/players/812531.webp', role: 'Titulaire', bio: 'Latéral gauche rapide et combatif.' },
      { id: 'irn6', name: 'Saeid EZATOLAHI', pos: 'Milieu', n: 6, age: 27, born: '01/10/1996', h: '1m90', club: 'Shabab Al-Ahli', caps: 65, goals: 1, ast: 3, debut: '2015', photo: 'images/players/359334.webp', role: 'Titulaire', bio: 'Sentinelle du milieu de terrain.' },
      { id: 'irn7', name: 'Saman GHODDOS', pos: 'Milieu', n: 14, age: 30, born: '29/09/1993', h: '1m76', club: 'Itthiad Kalba', caps: 50, goals: 3, ast: 8, debut: '2017', photo: 'images/players/548050.webp', role: 'Titulaire', bio: 'Meneur de jeu technique passé par la Premier League.' },
      { id: 'irn8', name: 'Alireza JAHANBAKHSH', pos: 'Milieu', n: 7, age: 30, born: '11/08/1993', h: '1m80', club: 'Heerenveen', caps: 85, goals: 15, ast: 15, debut: '2013', photo: 'images/players/331837.webp', role: 'Titulaire', bio: 'Ailier d\'expérience et capitaine adjoint.' },
      { id: 'irn9', name: 'Mehdi TAREMI', pos: 'Attaquant', n: 9, age: 32, born: '18/07/1992', h: '1m86', club: 'Inter Milan', caps: 85, goals: 50, ast: 18, debut: '2015', photo: 'images/players/812533.webp', role: 'Titulaire', bio: 'La superstar de l\'Inter, meilleur buteur iranien actuel.' },
      { id: 'irn10', name: 'Sardar AZMOUN', pos: 'Attaquant', n: 20, age: 29, born: '01/01/1995', h: '1m86', club: 'Shabab Al-Ahli', caps: 82, goals: 53, ast: 10, debut: '2014', photo: 'images/players/150998.webp', role: 'Titulaire', bio: 'Buteur prolifique surnommé le Messi iranien.' },
      { id: 'irn11', name: 'Mohammad MOHEBI', pos: 'Attaquant', n: 21, age: 25, born: '20/12/1998', h: '1m86', club: 'Rostov', caps: 20, goals: 6, ast: 2, debut: '2019', photo: 'https://img.sofascore.com/api/v1/player/1154672/image', role: 'Titulaire', bio: 'Ailier puissant évoluant en Russie.' },
      { id: 'irn12', name: 'Hossein HOSSEINI', pos: 'Gardien', n: 12, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/328769.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Iran.' },
      { id: 'irn13', name: 'Amir ABEDZADEH', pos: 'Défenseur', n: 13, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/828247.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Iran.' },
      { id: 'irn14', name: 'Shojae KHALILZADEH', pos: 'Défenseur', n: 14, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/223340.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Iran.' },
      { id: 'irn15', name: 'Hossein KANAANI', pos: 'Défenseur', n: 15, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/812952.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Iran.' },
      { id: 'irn16', name: 'Sadegh MOHARRAMI', pos: 'Défenseur', n: 16, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/359358.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Iran.' },
      { id: 'irn17', name: 'Ehsan HAJSAFI', pos: 'Milieu', n: 17, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1196902.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Iran.' },
      { id: 'irn18', name: 'Rouzbeh CHESHMI', pos: 'Milieu', n: 18, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/828230.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Iran.' },
      { id: 'irn19', name: 'Ali KARIMI', pos: 'Milieu', n: 19, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_ali_karimi.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Iran.' },
      { id: 'irn20', name: 'Omid EBRAHIMI', pos: 'Milieu', n: 20, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tm_omid_ebrahimi.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Iran.' },
      { id: 'irn21', name: 'Mehdi TORABI', pos: 'Attaquant', n: 21, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/812953.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Iran.' },
      { id: 'irn22', name: 'Vahid AMIRI', pos: 'Attaquant', n: 22, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/791373.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Iran.' },
      { id: 'irn23', name: 'Karim ANSARIFARD', pos: 'Attaquant', n: 23, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_karim_ansarifard.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Iran.' }
    ]
  },
  'Nouvelle-Zélande': {
    coach: 'Darren Bazeley', formation: '4-3-3', confederation: 'OFC', titles: 0,
    players: [
      { id: 'nzl1', name: 'Stefan MARINOVIC', pos: 'Gardien', n: 1, age: 32, born: '07/10/1991', h: '1m92', club: 'Indépendant', caps: 30, goals: 0, ast: 0, debut: '2015', photo: 'images/players/86007.webp', role: 'Titulaire', bio: 'Gardien d\'expérience.' },
      { id: 'nzl2', name: 'Bill TUILOMA', pos: 'Défenseur', n: 6, age: 29, born: '27/03/1995', h: '1m78', club: 'Charlotte FC', caps: 38, goals: 4, ast: 1, debut: '2013', photo: 'images/players/155892.webp', role: 'Titulaire', bio: 'Défenseur polyvalent de MLS.' },
      { id: 'nzl3', name: 'Michael BOXALL', pos: 'Défenseur', n: 4, age: 35, born: '18/08/1988', h: '1m88', club: 'Minnesota Utd', caps: 42, goals: 0, ast: 0, debut: '2011', photo: 'images/players/38624.webp', role: 'Titulaire', bio: 'Vétéran de la défense.' },
      { id: 'nzl4', name: 'Liberato CACACE', pos: 'Défenseur', n: 13, age: 23, born: '27/09/2000', h: '1m83', club: 'Empoli', caps: 22, goals: 1, ast: 3, debut: '2018', photo: 'images/players/905264.webp', role: 'Titulaire', bio: 'Grand espoir à Empoli.' },
      { id: 'nzl5', name: 'Tyler BINDON', pos: 'Défenseur', n: 2, age: 19, born: '27/01/2005', h: '1m86', club: 'Reading', caps: 8, goals: 0, ast: 0, debut: '2023', photo: 'images/players/1514870.webp', role: 'Titulaire', bio: 'Jeune défenseur central prometteur.' },
      { id: 'nzl6', name: 'Joe BELL', pos: 'Milieu', n: 8, age: 25, born: '27/04/1999', h: '1m82', club: 'Viking FK', caps: 12, goals: 1, ast: 1, debut: '2019', photo: 'images/players/822749.webp', role: 'Titulaire', bio: 'Milieu défensif solide.' },
      { id: 'nzl7', name: 'Marko STAMENIC', pos: 'Milieu', n: 10, age: 22, born: '19/02/2002', h: '1m88', club: 'Olympiakos', caps: 18, goals: 1, ast: 1, debut: '2021', photo: 'images/players/1002620.webp', role: 'Titulaire', bio: 'Milieu de terrain à gros volume.' },
      { id: 'nzl8', name: 'Ben OLD', pos: 'Milieu', n: 11, age: 21, born: '13/08/2002', h: '1m73', club: 'Saint-Étienne', caps: 5, goals: 1, ast: 2, debut: '2022', photo: 'images/players/1122425.webp', role: 'Titulaire', bio: 'Milieu créatif évoluant en Ligue 1.' },
      { id: 'nzl9', name: 'Chris WOOD', pos: 'Attaquant', n: 9, age: 32, born: '07/12/1991', h: '1m91', club: 'Nottm Forest', caps: 74, goals: 34, ast: 4, debut: '2009', photo: 'images/players/50480.webp', role: 'Titulaire', bio: 'Buteur prolifique de Premier League.' },
      { id: 'nzl10', name: 'Ben WAINE', pos: 'Attaquant', n: 19, age: 23, born: '11/06/2001', h: '1m78', club: 'Plymouth', caps: 10, goals: 5, ast: 1, debut: '2022', photo: 'images/players/944481.webp', role: 'Titulaire', bio: 'Attaquant vif et combatif.' },
      { id: 'nzl11', name: 'Kosta BARBAROUSES', pos: 'Attaquant', n: 7, age: 34, born: '19/02/1990', h: '1m71', club: 'Wellington Phoenix', caps: 58, goals: 6, ast: 7, debut: '2008', photo: 'images/players/31857.webp', role: 'Titulaire', bio: 'Ailier expérimenté.' },
      { id: 'nzl12', name: 'Max CROCOMBE', pos: 'Gardien', n: 12, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/197904.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Nouvelle-Zélande.' },
      { id: 'nzl13', name: 'Alex PAULSEN', pos: 'Défenseur', n: 13, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_alex_paulsen.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Nouvelle-Zélande.' },
      { id: 'nzl14', name: 'Nando PIJNAKER', pos: 'Défenseur', n: 14, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/982371.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Nouvelle-Zélande.' },
      { id: 'nzl15', name: 'Michael BOXALL', pos: 'Défenseur', n: 15, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/38624.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Nouvelle-Zélande.' },
      { id: 'nzl16', name: 'Tyler BINDON', pos: 'Défenseur', n: 16, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1514870.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Nouvelle-Zélande.' },
      { id: 'nzl17', name: 'Tim PAYNE', pos: 'Milieu', n: 17, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/155882.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Nouvelle-Zélande.' },
      { id: 'nzl18', name: 'Callan ELLIOT', pos: 'Milieu', n: 18, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/959750.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Nouvelle-Zélande.' },
      { id: 'nzl19', name: 'Cameron HOWIESON', pos: 'Milieu', n: 19, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/358084.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Nouvelle-Zélande.' },
      { id: 'nzl20', name: 'Sarpreet SINGH', pos: 'Milieu', n: 20, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/822743.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Nouvelle-Zélande.' },
      { id: 'nzl21', name: 'Alex RUFER', pos: 'Attaquant', n: 21, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_alex_rufer.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Nouvelle-Zélande.' },
      { id: 'nzl22', name: 'Ben WAINE', pos: 'Attaquant', n: 22, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/944481.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Nouvelle-Zélande.' },
      { id: 'nzl23', name: 'Kosta BARBAROUSES', pos: 'Attaquant', n: 23, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/31857.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Nouvelle-Zélande.' }
    ]
  },
  'Arabie saoudite': {
    coach: '', players: [
      { id: 'moh23', name: 'Mohammed AL-OWAIS', pos: 'Gardien', n: 21, age: 32, born: '01/01/1992', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_mohammed_al_owais.jpg', role: 'Titulaire', bio: 'Gardien de l\'équipe Arabie saoudite.' },
      { id: 'naw24', name: 'Nawaf AL-AQIDI', pos: 'Gardien', n: 1, age: 24, born: '01/01/2000', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1014518.webp', role: 'Remplaçant', bio: 'Gardien de l\'équipe Arabie saoudite.' },
      { id: 'moh25', name: 'Mohammed AL-RUBAIE', pos: 'Gardien', n: 22, age: 26, born: '01/01/1998', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_mohammed_al_rubaie.jpg', role: 'Remplaçant', bio: 'Gardien de l\'équipe Arabie saoudite.' },
      { id: 'abd26', name: 'Abdulelah AL-AMRI', pos: 'Défenseur', n: 5, age: 27, born: '01/01/1997', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/881831.webp', role: 'Titulaire', bio: 'Défenseur de l\'équipe Arabie saoudite.' },
      { id: 'ali27', name: 'Ali AL-BULAIHI', pos: 'Défenseur', n: 4, age: 34, born: '01/01/1990', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1138857.webp', role: 'Titulaire', bio: 'Défenseur de l\'équipe Arabie saoudite.' },
      { id: 'has28', name: 'Hassan TAMBAKTI', pos: 'Défenseur', n: 17, age: 25, born: '01/01/1999', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1544937.webp', role: 'Titulaire', bio: 'Défenseur de l\'équipe Arabie saoudite.' },
      { id: 'abd29', name: 'Abdullah MADU', pos: 'Défenseur', n: 3, age: 30, born: '01/01/1994', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/794347.webp', role: 'Titulaire', bio: 'Défenseur de l\'équipe Arabie saoudite.' },
      { id: 'sau30', name: 'Saud ABDULHAMID', pos: 'Défenseur', n: 12, age: 25, born: '01/01/1999', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/966849.webp', role: 'Remplaçant', bio: 'Défenseur de l\'équipe Arabie saoudite.' },
      { id: 'sul31', name: 'Sultan AL-GHANNAM', pos: 'Défenseur', n: 2, age: 30, born: '01/01/1994', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'https://img.sofascore.com/api/v1/player/976538/image', role: 'Remplaçant', bio: 'Défenseur de l\'équipe Arabie saoudite.' },
      { id: 'yas32', name: 'Yasser AL-SHAHRANI', pos: 'Défenseur', n: 13, age: 32, born: '01/01/1992', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_yasser_al_shahrani.jpg', role: 'Remplaçant', bio: 'Défenseur de l\'équipe Arabie saoudite.' },
      { id: 'moh33', name: 'Mohammed AL-BREIK', pos: 'Défenseur', n: 6, age: 31, born: '01/01/1993', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1111013.webp', role: 'Remplaçant', bio: 'Défenseur de l\'équipe Arabie saoudite.' },
      { id: 'sal34', name: 'Salman AL-FARAJ', pos: 'Milieu', n: 7, age: 34, born: '01/01/1990', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_salman_al_faraj.jpg', role: 'Titulaire', bio: 'Milieu de l\'équipe Arabie saoudite.' },
      { id: 'moh35', name: 'Mohamed KANNO', pos: 'Milieu', n: 23, age: 29, born: '01/01/1995', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/828524.webp', role: 'Titulaire', bio: 'Milieu de l\'équipe Arabie saoudite.' },
      { id: 'abd36', name: 'Abdulelah AL-MALKI', pos: 'Milieu', n: 8, age: 29, born: '01/01/1995', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/881831.webp', role: 'Titulaire', bio: 'Milieu de l\'équipe Arabie saoudite.' },
      { id: 'abd37', name: 'Abdullah OTAYF', pos: 'Milieu', n: 14, age: 31, born: '01/01/1993', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/160925.webp', role: 'Remplaçant', bio: 'Milieu de l\'équipe Arabie saoudite.' },
      { id: 'ali38', name: 'Ali AL-HASSAN', pos: 'Milieu', n: 15, age: 27, born: '01/01/1997', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'https://img.sofascore.com/api/v1/player/1474870/image', role: 'Remplaçant', bio: 'Milieu de l\'équipe Arabie saoudite.' },
      { id: 'sam39', name: 'Sami AL-NAJEI', pos: 'Milieu', n: 16, age: 27, born: '01/01/1997', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/832312.webp', role: 'Remplaçant', bio: 'Milieu de l\'équipe Arabie saoudite.' },
      { id: 'naw40', name: 'Nawaf AL-ABED', pos: 'Milieu', n: 20, age: 34, born: '01/01/1990', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/144377.webp', role: 'Remplaçant', bio: 'Milieu de l\'équipe Arabie saoudite.' },
      { id: 'sal41', name: 'Salem AL-DAWSARI', pos: 'Milieu', n: 10, age: 32, born: '01/01/1992', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_salem_al_dawsari.jpg', role: 'Remplaçant', bio: 'Milieu de l\'équipe Arabie saoudite.' },
      { id: 'hat42', name: 'Hattan BAEBRI', pos: 'Attaquant', n: 11, age: 31, born: '01/01/1993', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/803052.webp', role: 'Titulaire', bio: 'Attaquant de l\'équipe Arabie saoudite.' },
      { id: 'fir43', name: 'Firas AL-BURAIKAN', pos: 'Attaquant', n: 9, age: 24, born: '01/01/2000', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_firas_al_buraikan.jpg', role: 'Titulaire', bio: 'Attaquant de l\'équipe Arabie saoudite.' },
      { id: 'sal44', name: 'Saleh AL-SHEHRI', pos: 'Attaquant', n: 11, age: 30, born: '01/01/1994', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/818779.webp', role: 'Titulaire', bio: 'Attaquant de l\'équipe Arabie saoudite.' },
      { id: 'hai45', name: 'Haitham ASIRI', pos: 'Attaquant', n: 19, age: 23, born: '01/01/2001', h: '1m80', club: 'Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1118489.webp', role: 'Remplaçant', bio: 'Attaquant de l\'équipe Arabie saoudite.' },
    ]
  },
  'Algérie': {
    coach: 'Vladimir Petković', formation: '4-3-3', confederation: 'CAF', titles: 0,
    players: [
      { id: 'alg1', name: 'Anthony MANDREA', pos: 'Gardien', n: 1, age: 27, born: '25/12/1996', h: '1m86', club: 'SM Caen', caps: 18, goals: 0, ast: 0, debut: '2022', photo: 'images/players/360868.webp', role: 'Titulaire', bio: 'Gardien titulaire de l\'Algérie.' },
      { id: 'alg2', name: 'Aïssa MANDI', pos: 'Défenseur', n: 2, age: 32, born: '22/10/1991', h: '1m84', club: 'Lille OSC', caps: 97, goals: 5, ast: 2, debut: '2014', photo: 'images/players/tsdb_aissa_mandi.jpg', role: 'Titulaire', bio: 'Pilier de la défense algérienne.' },
      { id: 'alg3', name: 'Ramy BENSEBAINI', pos: 'Défenseur', n: 21, age: 29, born: '16/04/1995', h: '1m86', club: 'Dortmund', caps: 63, goals: 6, ast: 4, debut: '2017', photo: 'images/players/tsdb_ramy_bensebaini.jpg', role: 'Titulaire', bio: 'Défenseur de Dortmund.' },
      { id: 'alg4', name: 'Youcef ATAL', pos: 'Défenseur', n: 20, age: 28, born: '17/05/1996', h: '1m75', club: 'Adana Demirspor', caps: 42, goals: 2, ast: 6, debut: '2017', photo: 'images/players/894238.webp', role: 'Titulaire', bio: 'Latéral droit offensif.' },
      { id: 'alg5', name: 'Rayan AIT-NOURI', pos: 'Défenseur', n: 3, age: 23, born: '06/06/2001', h: '1m79', club: 'Wolverhampton', caps: 13, goals: 0, ast: 2, debut: '2023', photo: 'images/players/931278.webp', role: 'Titulaire', bio: 'Latéral gauche de Premier League.' },
      { id: 'alg6', name: 'Ismaël BENNACER', pos: 'Milieu', n: 22, age: 26, born: '01/12/1997', h: '1m75', club: 'AC Milan', caps: 50, goals: 2, ast: 8, debut: '2016', photo: 'images/players/tsdb_ismael_bennacer.jpg', role: 'Titulaire', bio: 'Meneur de l\'AC Milan.' },
      { id: 'alg7', name: 'Nabil BENTALEB', pos: 'Milieu', n: 6, age: 29, born: '24/11/1994', h: '1m87', club: 'Lille OSC', caps: 52, goals: 5, ast: 3, debut: '2014', photo: 'images/players/tsdb_nabil_bentaleb.jpg', role: 'Titulaire', bio: 'Milieu défensif.' },
      { id: 'alg8', name: 'Ramiz ZERROUKI', pos: 'Milieu', n: 8, age: 25, born: '01/01/2000', h: '1m80', club: 'Feyenoord', caps: 25, goals: 2, ast: 1, debut: '2020', photo: 'images/players/989882.webp', role: 'Titulaire', bio: 'Milieu de Feyenoord.' },
      { id: 'alg9', name: 'Riyad MAHREZ', pos: 'Attaquant', n: 7, age: 33, born: '21/02/1991', h: '1m79', club: 'Al-Ahli', caps: 94, goals: 31, ast: 40, debut: '2014', photo: 'images/players/158213.webp', role: 'Titulaire', bio: 'Légende de la sélection.' },
      { id: 'alg10', name: 'Youcef BELAÏLI', pos: 'Attaquant', n: 10, age: 32, born: '14/03/1992', h: '1m78', club: 'ES Tunis', caps: 54, goals: 9, ast: 22, debut: '2015', photo: 'images/players/894238.webp', role: 'Titulaire', bio: 'Dribbleur hors pair.' },
      { id: 'alg11', name: 'Islam SLIMANI', pos: 'Attaquant', n: 11, age: 36, born: '18/06/1988', h: '1m88', club: 'Malines', caps: 102, goals: 46, ast: 18, debut: '2012', photo: 'https://img.sofascore.com/api/v1/player/918486/image', role: 'Titulaire', bio: 'Meilleur buteur de l\'histoire de l\'Algérie.' },
      { id: 'alg12', name: 'Raïs M\'BOLHI', pos: 'Gardien', n: 12, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/75486.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Algérie.' },
      { id: 'alg13', name: 'Moustapha ZEGHBA', pos: 'Défenseur', n: 13, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/888378.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Algérie.' },
      { id: 'alg14', name: 'Mohamed TOUGAI', pos: 'Défenseur', n: 14, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1018018.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Algérie.' },
      { id: 'alg15', name: 'Ahmed TOUBA', pos: 'Défenseur', n: 15, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/856216.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Algérie.' },
      { id: 'alg16', name: 'Kevin GUITON', pos: 'Défenseur', n: 16, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1734324.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Algérie.' },
      { id: 'alg17', name: 'Yasser LAROUCI', pos: 'Milieu', n: 17, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_yasser_larouci.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Algérie.' },
      { id: 'alg18', name: 'Houssem AOUAR', pos: 'Milieu', n: 18, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/846081.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Algérie.' },
      { id: 'alg19', name: 'Farès CHAÏBI', pos: 'Milieu', n: 19, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1192318.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Algérie.' },
      { id: 'alg20', name: 'Hicham BOUDAOUI', pos: 'Milieu', n: 20, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/985923.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Algérie.' },
      { id: 'alg21', name: 'Baghdad BOUNEDJAH', pos: 'Attaquant', n: 21, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/785926.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Algérie.' },
      { id: 'alg22', name: 'Amine GOUIRI', pos: 'Attaquant', n: 22, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/859026.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Algérie.' },
      { id: 'alg23', name: 'Mohammed AMOURA', pos: 'Attaquant', n: 23, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_mohammed_amoura.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Algérie.' }
    ]
  },
  'Autriche': {
    coach: 'Ralf Rangnick', formation: '4-3-3', confederation: 'UEFA', titles: 0,
    players: [
      { id: 'aut1', name: 'Patrick PENTZ', pos: 'Gardien', n: 13, age: 27, born: '02/01/1997', h: '1m86', club: 'Brøndby', caps: 15, goals: 0, ast: 0, debut: '2022', photo: 'images/players/788319.webp', role: 'Titulaire', bio: 'Gardien titulaire à l\'Euro 2024.' },
      { id: 'aut2', name: 'David ALABA', pos: 'Défenseur', n: 8, age: 32, born: '24/06/1992', h: '1m80', club: 'Real Madrid', caps: 105, goals: 15, ast: 12, debut: '2009', photo: 'images/players/tsdb_david_alaba.jpg', role: 'Titulaire', bio: 'Capitaine emblématique et star mondiale.' },
      { id: 'aut3', name: 'Stefan POSCH', pos: 'Défenseur', n: 5, age: 27, born: '14/05/1997', h: '1m90', club: 'Bologne', caps: 35, goals: 1, ast: 3, debut: '2019', photo: 'images/players/355486.webp', role: 'Titulaire', bio: 'Latéral droit solide en Serie A.' },
      { id: 'aut4', name: 'Philipp LIENHART', pos: 'Défenseur', n: 15, age: 27, born: '11/07/1996', h: '1m87', club: 'Fribourg', caps: 25, goals: 1, ast: 0, debut: '2017', photo: 'images/players/tsdb_philipp_lienhart.jpg', role: 'Titulaire', bio: 'Défenseur central d\'expérience.' },
      { id: 'aut5', name: 'Kevin DANSO', pos: 'Défenseur', n: 4, age: 25, born: '19/09/1998', h: '1m90', club: 'RC Lens', caps: 25, goals: 0, ast: 1, debut: '2017', photo: 'images/players/794953.webp', role: 'Titulaire', bio: 'Pilier de la défense du RC Lens.' },
      { id: 'aut6', name: 'Nicolas SEIWALD', pos: 'Milieu', n: 6, age: 23, born: '04/05/2001', h: '1m79', club: 'RB Leipzig', caps: 28, goals: 0, ast: 4, debut: '2021', photo: 'images/players/tsdb_nicolas_seiwald.jpg', role: 'Titulaire', bio: 'Moteur du milieu de terrain.' },
      { id: 'aut7', name: 'Marcel SABITZER', pos: 'Milieu', n: 9, age: 30, born: '17/03/1994', h: '1m77', club: 'Dortmund', caps: 80, goals: 17, ast: 14, debut: '2012', photo: 'images/players/tsdb_marcel_sabitzer.jpg', role: 'Titulaire', bio: 'Milieu créatif et décisif de Dortmund.' },
      { id: 'aut8', name: 'Konrad LAIMER', pos: 'Milieu', n: 20, age: 27, born: '27/05/1997', h: '1m80', club: 'Bayern Munich', caps: 40, goals: 4, ast: 5, debut: '2019', photo: 'images/players/tsdb_konrad_laimer.jpg', role: 'Titulaire', bio: 'Inépuisable milieu du Bayern Munich.' },
      { id: 'aut9', name: 'Christoph BAUMGARTNER', pos: 'Attaquant', n: 19, age: 24, born: '01/08/1999', h: '1m80', club: 'RB Leipzig', caps: 42, goals: 15, ast: 8, debut: '2020', photo: 'images/players/tsdb_christoph_baumgartner.jpg', role: 'Titulaire', bio: 'Ailier très technique.' },
      { id: 'aut10', name: 'Romano SCHMID', pos: 'Attaquant', n: 18, age: 24, born: '27/01/2000', h: '1m70', club: 'Werder Brême', caps: 15, goals: 1, ast: 4, debut: '2022', photo: 'images/players/tsdb_romano_schmid.jpg', role: 'Titulaire', bio: 'Créateur de jeu de Brême.' },
      { id: 'aut11', name: 'Marko ARNAUTOVIC', pos: 'Attaquant', n: 7, age: 35, born: '19/04/1989', h: '1m92', club: 'Inter Milan', caps: 115, goals: 37, ast: 26, debut: '2008', photo: 'images/players/tsdb_marko_arnautovic.jpg', role: 'Titulaire', bio: 'Buteur charismatique, légende autrichienne.' },
      { id: 'aut12', name: 'Alexander SCHLAGER', pos: 'Gardien', n: 12, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_alexander_schlager.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Autriche.' },
      { id: 'aut13', name: 'Patrick PENTZ', pos: 'Défenseur', n: 13, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/788319.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Autriche.' },
      { id: 'aut14', name: 'Kevin DANSO', pos: 'Défenseur', n: 14, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/794953.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Autriche.' },
      { id: 'aut15', name: 'Samson BAIDOO', pos: 'Défenseur', n: 15, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_samson_baidoo.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Autriche.' },
      { id: 'aut16', name: 'Phillipp MWENE', pos: 'Défenseur', n: 16, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_phillipp_mwene.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Autriche.' },
      { id: 'aut17', name: 'Alexander PRASS', pos: 'Milieu', n: 17, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_alexander_prass.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Autriche.' },
      { id: 'aut18', name: 'Florian GRILLITSCH', pos: 'Milieu', n: 18, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_florian_grillitsch.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Autriche.' },
      { id: 'aut19', name: 'Dejan LJUBICIC', pos: 'Milieu', n: 19, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_dejan_ljubicic.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Autriche.' },
      { id: 'aut20', name: 'Romano SCHMID', pos: 'Milieu', n: 20, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_romano_schmid.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Autriche.' },
      { id: 'aut21', name: 'Patrick WIMMER', pos: 'Attaquant', n: 21, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_patrick_wimmer.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Autriche.' },
      { id: 'aut22', name: 'Michael GREGORITSCH', pos: 'Attaquant', n: 22, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/111483.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Autriche.' },
      { id: 'aut23', name: 'Sasa KALAJDZIC', pos: 'Attaquant', n: 23, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_sasa_kalajdzic.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Autriche.' }
    ]
  },
  'Jordanie': {
    coach: 'Jamal Sellami', formation: '4-3-3', confederation: 'AFC', titles: 0,
    players: [
      { id: 'jor1', name: 'Yazeed ABULALIA', pos: 'Gardien', n: 1, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'https://img.sofascore.com/api/v1/player/828294/image', role: 'Titulaire', bio: 'Joueur clé de la sélection Jordanie.' },
      { id: 'jor2', name: 'Yazan AL-ARAB', pos: 'Défenseur', n: 2, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'https://img.sofascore.com/api/v1/player/888906/image', role: 'Titulaire', bio: 'Joueur clé de la sélection Jordanie.' },
      { id: 'jor3', name: 'Abdallah NASIB', pos: 'Défenseur', n: 3, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1114497.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Jordanie.' },
      { id: 'jor4', name: 'Ihsan HADDAD', pos: 'Défenseur', n: 4, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/812997.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Jordanie.' },
      { id: 'jor5', name: 'Salem AL-AJALIN', pos: 'Défenseur', n: 5, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/924265.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Jordanie.' },
      { id: 'jor6', name: 'Nizar AL-RASHDAN', pos: 'Milieu', n: 6, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1014324.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Jordanie.' },
      { id: 'jor7', name: 'Noor AL-RAWABDEH', pos: 'Milieu', n: 7, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/927845.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Jordanie.' },
      { id: 'jor8', name: 'Mousa AL-TAMARI', pos: 'Milieu', n: 8, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'https://img.sofascore.com/api/v1/player/876600/image', role: 'Titulaire', bio: 'Joueur clé de la sélection Jordanie.' },
      { id: 'jor9', name: 'Ali OLWAN', pos: 'Attaquant', n: 9, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/980728.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Jordanie.' },
      { id: 'jor10', name: 'Mahmoud AL-MARDI', pos: 'Attaquant', n: 10, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/812557.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Jordanie.' },
      { id: 'jor11', name: 'Yazan AL-NAIMAT', pos: 'Attaquant', n: 11, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'https://img.sofascore.com/api/v1/player/888906/image', role: 'Titulaire', bio: 'Joueur clé de la sélection Jordanie.' },
      { id: 'jor12', name: 'Abdullah AL-FAKHOURI', pos: 'Gardien', n: 12, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/974747.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Jordanie.' },
      { id: 'jor13', name: 'Ahmed AL-JUAIDI', pos: 'Défenseur', n: 13, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'https://img.sofascore.com/api/v1/player/1014310/image', role: 'Remplaçant', bio: 'Joueur clé de la sélection Jordanie.' },
      { id: 'jor14', name: 'Anas BANI YASEEN', pos: 'Défenseur', n: 14, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tm_anas_bani_yaseen.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Jordanie.' },
      { id: 'jor15', name: 'Bara MAREI', pos: 'Défenseur', n: 15, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/873368.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Jordanie.' },
      { id: 'jor16', name: 'Feras SHELBAIEH', pos: 'Défenseur', n: 16, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/809724.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Jordanie.' },
      { id: 'jor17', name: 'Mohammed ABU HASHEESH', pos: 'Milieu', n: 17, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1139989.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Jordanie.' },
      { id: 'jor18', name: 'Rajaei AYED', pos: 'Milieu', n: 18, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/786030.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Jordanie.' },
      { id: 'jor19', name: 'Ibrahim SADEH', pos: 'Milieu', n: 19, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/997817.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Jordanie.' },
      { id: 'jor20', name: 'Saleh RATEB', pos: 'Milieu', n: 20, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/2334203.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Jordanie.' },
      { id: 'jor21', name: 'Anas AL-AWADAT', pos: 'Attaquant', n: 21, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'https://img.sofascore.com/api/v1/player/1393840/image', role: 'Remplaçant', bio: 'Joueur clé de la sélection Jordanie.' },
      { id: 'jor22', name: 'Yousef ABU JALBOSH', pos: 'Attaquant', n: 22, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/920519.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Jordanie.' },
      { id: 'jor23', name: 'Hamza AL-DARDOUR', pos: 'Attaquant', n: 23, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1501597.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Jordanie.' }
    ]
  },
  'Cameroun': {
    coach: 'Marc Brys', formation: '4-3-3', confederation: 'CAF', titles: 0,
    players: [
      { id: 'cmr1', name: 'André ONANA', pos: 'Gardien', n: 24, age: 28, born: '02/04/1996', h: '1m90', club: 'Man. United', caps: 40, goals: 0, ast: 0, debut: '2016', photo: 'images/players/tsdb_andre_onana.jpg', role: 'Titulaire', bio: 'Gardien de Manchester United.' },
      { id: 'cmr2', name: 'Christopher WOOH', pos: 'Défenseur', n: 4, age: 22, born: '18/09/2001', h: '1m91', club: 'Stade Rennais', caps: 15, goals: 2, ast: 0, debut: '2022', photo: 'https://img.sofascore.com/api/v1/player/1477662/image', role: 'Titulaire', bio: 'Défenseur central solide.' },
      { id: 'cmr3', name: 'Jean-Charles CASTELLETTO', pos: 'Défenseur', n: 21, age: 29, born: '26/01/1995', h: '1m86', club: 'FC Nantes', caps: 30, goals: 2, ast: 1, debut: '2017', photo: 'images/players/191204.webp', role: 'Titulaire', bio: 'Défenseur central polyvalent.' },
      { id: 'cmr4', name: 'Harold MOUKOUDI', pos: 'Défenseur', n: 2, age: 26, born: '27/11/1997', h: '1m91', club: 'AEK Athènes', caps: 18, goals: 0, ast: 0, debut: '2019', photo: 'images/players/795128.webp', role: 'Titulaire', bio: 'Défenseur central imposant.' },
      { id: 'cmr5', name: 'Nouhou TOLO', pos: 'Défenseur', n: 5, age: 27, born: '23/06/1997', h: '1m78', club: 'Seattle Sounders', caps: 30, goals: 0, ast: 2, debut: '2017', photo: 'images/players/tsdb_nouhou_tolo.jpg', role: 'Titulaire', bio: 'Latéral gauche dynamique.' },
      { id: 'cmr6', name: 'André-Frank ZAMBO ANGUISSA', pos: 'Milieu', n: 8, age: 28, born: '16/11/1995', h: '1m84', club: 'Napoli', caps: 55, goals: 5, ast: 4, debut: '2017', photo: 'images/players/tsdb_andre_frank_zambo_anguissa.jpg', role: 'Titulaire', bio: 'Plaque tournante du milieu du Napoli.' },
      { id: 'cmr7', name: 'Pierre KUNDÉ', pos: 'Milieu', n: 15, age: 28, born: '26/07/1995', h: '1m80', club: 'Atromitos', caps: 40, goals: 1, ast: 3, debut: '2018', photo: 'images/players/tsdb_pierre_kunde.jpg', role: 'Titulaire', bio: 'Milieu box-to-box.' },
      { id: 'cmr8', name: 'Olivier NTCHAM', pos: 'Milieu', n: 22, age: 28, born: '09/02/1996', h: '1m80', club: 'Samsunspor', caps: 15, goals: 1, ast: 2, debut: '2022', photo: 'images/players/352676.webp', role: 'Titulaire', bio: 'Milieu créatif.' },
      { id: 'cmr9', name: 'Bryan MBEUMO', pos: 'Attaquant', n: 20, age: 25, born: '07/08/1999', h: '1m76', club: 'Brentford', caps: 18, goals: 4, ast: 3, debut: '2022', photo: 'images/players/tsdb_bryan_mbeumo.jpg', role: 'Titulaire', bio: 'Ailier percutant de Premier League.' },
      { id: 'cmr10', name: 'Vincent ABOUBAKAR', pos: 'Attaquant', n: 10, age: 32, born: '22/01/1992', h: '1m84', club: 'Hatayspor', caps: 102, goals: 40, ast: 7, debut: '2010', photo: 'images/players/794412.webp', role: 'Titulaire', bio: 'Capitaine emblématique, buteur historique.' },
      { id: 'cmr11', name: 'Georges-Kévin NKOUDOU', pos: 'Attaquant', n: 11, age: 29, born: '13/02/1995', h: '1m72', club: 'Damac FC', caps: 10, goals: 3, ast: 2, debut: '2022', photo: 'images/players/tsdb_georges_kevin_nkoudou.jpg', role: 'Titulaire', bio: 'Ailier rapide et technique.' },
      { id: 'cmr12', name: 'Fabrice ONDOUA', pos: 'Gardien', n: 12, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/316088.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Cameroun.' },
      { id: 'cmr13', name: 'Devis EPASSY', pos: 'Défenseur', n: 13, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_devis_epassy.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Cameroun.' },
      { id: 'cmr14', name: 'Nicolas NKOULOU', pos: 'Défenseur', n: 14, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Nicolas_N%27Koulou.jpg/400px-Nicolas_N%27Koulou.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Cameroun.' },
      { id: 'cmr15', name: 'Harold MOUKOUDI', pos: 'Défenseur', n: 15, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/795128.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Cameroun.' },
      { id: 'cmr16', name: 'Oumar GONZALEZ', pos: 'Défenseur', n: 16, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/901325.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Cameroun.' },
      { id: 'cmr17', name: 'Darlin YONGWA', pos: 'Milieu', n: 17, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/998241.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Cameroun.' },
      { id: 'cmr18', name: 'Martin HONGLA', pos: 'Milieu', n: 18, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/856062.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Cameroun.' },
      { id: 'cmr19', name: 'Pierre KUNDE', pos: 'Milieu', n: 19, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_pierre_kunde.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Cameroun.' },
      { id: 'cmr20', name: 'Olivier KEMEN', pos: 'Milieu', n: 20, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/280447.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Cameroun.' },
      { id: 'cmr21', name: 'Clinton N\'JIE', pos: 'Attaquant', n: 21, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/291665.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Cameroun.' },
      { id: 'cmr22', name: 'Vincent ABOUBAKAR2', pos: 'Attaquant', n: 22, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/116869.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Cameroun.' },
      { id: 'cmr23', name: 'Georges-Kévin NKOUDOU', pos: 'Attaquant', n: 23, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_georges_kevin_nkoudou.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Cameroun.' }
    ]
  },
  'Ouzbékistan': {
    coach: 'Srečko Katanec', formation: '4-3-3', confederation: 'AFC', titles: 0,
    players: [
      { id: 'uzb1', name: 'Utkir YUSUPOV', pos: 'Gardien', n: 1, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/791592.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Ouzbékistan.' },
      { id: 'uzb2', name: 'Rustam ASHURMATOV', pos: 'Défenseur', n: 2, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/358822.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Ouzbékistan.' },
      { id: 'uzb3', name: 'Abdukodir KHUSANOV', pos: 'Défenseur', n: 3, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tm_abdukodir_khusanov.jpg', role: 'Titulaire', bio: 'Joueur clé de la sélection Ouzbékistan.' },
      { id: 'uzb4', name: 'Umar ESHJUROV', pos: 'Défenseur', n: 4, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'https://api.dicebear.com/7.x/initials/svg?seed=Umar+ESHJUROV&backgroundColor=92a4df&textColor=ffffff&fontSize=38&fontWeight=700&size=200', role: 'Titulaire', bio: 'Joueur clé de la sélection Ouzbékistan.' },
      { id: 'uzb5', name: 'Khojiakbar ALIJONOV', pos: 'Défenseur', n: 5, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_khojiakbar_alijonov.jpg', role: 'Titulaire', bio: 'Joueur clé de la sélection Ouzbékistan.' },
      { id: 'uzb6', name: 'Farrukh SAYFIEV', pos: 'Milieu', n: 6, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/792386.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Ouzbékistan.' },
      { id: 'uzb7', name: 'Otabek SHUKUROV', pos: 'Milieu', n: 7, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/358890.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Ouzbékistan.' },
      { id: 'uzb8', name: 'Odiljon HAMROBEKOV', pos: 'Milieu', n: 8, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tm_odiljon_hamrobekov.jpg', role: 'Titulaire', bio: 'Joueur clé de la sélection Ouzbékistan.' },
      { id: 'uzb9', name: 'Jaloliddin MASHAARIPOV', pos: 'Attaquant', n: 9, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/333611.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Ouzbékistan.' },
      { id: 'uzb10', name: 'Eldor SHOMURODOV', pos: 'Attaquant', n: 10, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/791355.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Ouzbékistan.' },
      { id: 'uzb11', name: 'Oston URUNOV', pos: 'Attaquant', n: 11, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_oston_urunov.jpg', role: 'Titulaire', bio: 'Joueur clé de la sélection Ouzbékistan.' },
      { id: 'uzb12', name: 'Abduvohid NEMATOV', pos: 'Gardien', n: 12, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1000465.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Ouzbékistan.' },
      { id: 'uzb13', name: 'Botirali ERGASHEV', pos: 'Défenseur', n: 13, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/796361.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Ouzbékistan.' },
      { id: 'uzb14', name: 'Husniddin ALIKULOV', pos: 'Défenseur', n: 14, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1121174.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Ouzbékistan.' },
      { id: 'uzb15', name: 'Mukhammadkodir KHAMRALIEV', pos: 'Défenseur', n: 15, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1156415.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Ouzbékistan.' },
      { id: 'uzb16', name: 'Ibrokhimkhalil YULDOSHEV', pos: 'Défenseur', n: 16, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1033795.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Ouzbékistan.' },
      { id: 'uzb17', name: 'Sherzod NASRULLAEV', pos: 'Milieu', n: 17, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1014276.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Ouzbékistan.' },
      { id: 'uzb18', name: 'Jamshid ISKANDEROV', pos: 'Milieu', n: 18, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/785512.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Ouzbékistan.' },
      { id: 'uzb19', name: 'Azizbek TURGUNBOEV', pos: 'Milieu', n: 19, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/971572.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Ouzbékistan.' },
      { id: 'uzb20', name: 'Khojimat ERKINBOEV', pos: 'Milieu', n: 20, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'https://api.dicebear.com/7.x/initials/svg?seed=Khojimat+ERKINBOEV&backgroundColor=92a4df&textColor=ffffff&fontSize=38&fontWeight=700&size=200', role: 'Remplaçant', bio: 'Joueur clé de la sélection Ouzbékistan.' },
      { id: 'uzb21', name: 'Igor SERGEEV', pos: 'Attaquant', n: 21, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/333625.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Ouzbékistan.' },
      { id: 'uzb22', name: 'Bobur ABDIKHOLIKOV', pos: 'Attaquant', n: 22, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/823991.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Ouzbékistan.' },
      { id: 'uzb23', name: 'Azizbek AMONOV', pos: 'Attaquant', n: 23, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1615318.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Ouzbékistan.' }
    ]
  },
  'Ghana': {
    coach: 'Otto Addo', formation: '4-3-3', confederation: 'CAF', titles: 0,
    players: [
      { id: 'gha1', name: 'Lawrence ATI-ZIGI', pos: 'Gardien', n: 1, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/791092.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Ghana.' },
      { id: 'gha2', name: 'Alexander DJIKU', pos: 'Défenseur', n: 2, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/289977.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Ghana.' },
      { id: 'gha3', name: 'Mohammed SALISU', pos: 'Défenseur', n: 3, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_mohammed_salisu.jpg', role: 'Titulaire', bio: 'Joueur clé de la sélection Ghana.' },
      { id: 'gha4', name: 'Denis ODOI', pos: 'Défenseur', n: 4, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/58994.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Ghana.' },
      { id: 'gha5', name: 'Gideon MENSAH', pos: 'Défenseur', n: 5, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_gideon_mensah.jpg', role: 'Titulaire', bio: 'Joueur clé de la sélection Ghana.' },
      { id: 'gha6', name: 'Salis ABDUL SAMED', pos: 'Milieu', n: 6, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tm_salis_abdul_samed.jpg', role: 'Titulaire', bio: 'Joueur clé de la sélection Ghana.' },
      { id: 'gha7', name: 'Thomas PARTEY', pos: 'Milieu', n: 7, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_thomas_partey.jpg', role: 'Titulaire', bio: 'Joueur clé de la sélection Ghana.' },
      { id: 'gha8', name: 'Mohammed KUDUS', pos: 'Milieu', n: 8, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_mohammed_kudus.jpg', role: 'Titulaire', bio: 'Joueur clé de la sélection Ghana.' },
      { id: 'gha9', name: 'Jordan AYEW', pos: 'Attaquant', n: 9, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/103045.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Ghana.' },
      { id: 'gha10', name: 'Antoine SEMENYO', pos: 'Attaquant', n: 10, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/934354.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Ghana.' },
      { id: 'gha11', name: 'Iñaki WILLIAMS', pos: 'Attaquant', n: 11, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'https://img.sofascore.com/api/v1/player/783374/image', role: 'Titulaire', bio: 'Joueur clé de la sélection Ghana.' },
      { id: 'gha12', name: 'Richard OFORI', pos: 'Gardien', n: 12, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/332983.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Ghana.' },
      { id: 'gha13', name: 'Joe WOLLACOTT', pos: 'Défenseur', n: 13, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/829507.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Ghana.' },
      { id: 'gha14', name: 'Daniel AMARTEY', pos: 'Défenseur', n: 14, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/308526.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Ghana.' },
      { id: 'gha15', name: 'Nicholas OPOKU', pos: 'Défenseur', n: 15, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_nicholas_opoku.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Ghana.' },
      { id: 'gha16', name: 'Alidu SEIDU', pos: 'Défenseur', n: 16, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1049515.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Ghana.' },
      { id: 'gha17', name: 'Abdul RAHMAN BABA', pos: 'Milieu', n: 17, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'https://img.sofascore.com/api/v1/player/1103589/image', role: 'Remplaçant', bio: 'Joueur clé de la sélection Ghana.' },
      { id: 'gha18', name: 'Majeed ASHIMERU', pos: 'Milieu', n: 18, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/901149.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Ghana.' },
      { id: 'gha19', name: 'Elisha OWUSU', pos: 'Milieu', n: 19, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_elisha_owusu.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Ghana.' },
      { id: 'gha20', name: 'Iddrisu BABA', pos: 'Milieu', n: 20, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/914014.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Ghana.' },
      { id: 'gha21', name: 'Joseph PAINTSIL', pos: 'Attaquant', n: 21, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_joseph_paintsil.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Ghana.' },
      { id: 'gha22', name: 'Nuamah ERNEST', pos: 'Attaquant', n: 22, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_nuamah_ernest.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Ghana.' },
      { id: 'gha23', name: 'Kamaldeen SULEMANA', pos: 'Attaquant', n: 23, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1019442.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Ghana.' }
    ]
  },
  'Panamá': {
    coach: 'Thomas Christiansen', formation: '4-3-3', confederation: 'CONCACAF', titles: 0,
    players: [
      { id: 'pan1', name: 'Orlando MOSQUERA', pos: 'Gardien', n: 1, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/886041.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Panamá.' },
      { id: 'pan2', name: 'Fidel ESCOBAR', pos: 'Défenseur', n: 2, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tm_fidel_escobar.jpg', role: 'Titulaire', bio: 'Joueur clé de la sélection Panamá.' },
      { id: 'pan3', name: 'Andrés ANDRADE', pos: 'Défenseur', n: 3, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_andres_andrade.jpg', role: 'Titulaire', bio: 'Joueur clé de la sélection Panamá.' },
      { id: 'pan4', name: 'José CÓRDOBA', pos: 'Défenseur', n: 4, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_jose_cordoba.jpg', role: 'Titulaire', bio: 'Joueur clé de la sélection Panamá.' },
      { id: 'pan5', name: 'Michael MURILLO', pos: 'Défenseur', n: 5, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_michael_murillo.jpg', role: 'Titulaire', bio: 'Joueur clé de la sélection Panamá.' },
      { id: 'pan6', name: 'Eric DAVIS', pos: 'Milieu', n: 6, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_eric_davis.jpg', role: 'Titulaire', bio: 'Joueur clé de la sélection Panamá.' },
      { id: 'pan7', name: 'Aníbal GODOY', pos: 'Milieu', n: 7, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_anibal_godoy.jpg', role: 'Titulaire', bio: 'Joueur clé de la sélection Panamá.' },
      { id: 'pan8', name: 'Adalberto CARRASQUILLA', pos: 'Milieu', n: 8, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/796330.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Panamá.' },
      { id: 'pan9', name: 'Edgar BÁRCENAS', pos: 'Attaquant', n: 9, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'https://img.sofascore.com/api/v1/player/833352/image', role: 'Titulaire', bio: 'Joueur clé de la sélection Panamá.' },
      { id: 'pan10', name: 'Ismael DÍAZ', pos: 'Attaquant', n: 10, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/796328.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Panamá.' },
      { id: 'pan11', name: 'José FAJARDO', pos: 'Attaquant', n: 11, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/936184.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Panamá.' },
      { id: 'pan12', name: 'Luis MEJÍA', pos: 'Gardien', n: 12, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/144800.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Panamá.' },
      { id: 'pan13', name: 'Samir RAMÍREZ', pos: 'Défenseur', n: 13, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'https://img.sofascore.com/api/v1/player/1459658/image', role: 'Remplaçant', bio: 'Joueur clé de la sélection Panamá.' },
      { id: 'pan14', name: 'Roderick MILLER', pos: 'Défenseur', n: 14, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tm_roderick_miller.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Panamá.' },
      { id: 'pan15', name: 'Eduardo ANDERSON', pos: 'Défenseur', n: 15, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'https://img.sofascore.com/api/v1/player/973887/image', role: 'Remplaçant', bio: 'Joueur clé de la sélection Panamá.' },
      { id: 'pan16', name: 'Iván ANDERSON', pos: 'Défenseur', n: 16, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'https://img.sofascore.com/api/v1/player/994546/image', role: 'Remplaçant', bio: 'Joueur clé de la sélection Panamá.' },
      { id: 'pan17', name: 'César BLACKMAN', pos: 'Milieu', n: 17, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/841793.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Panamá.' },
      { id: 'pan18', name: 'Cristian MARTÍNEZ', pos: 'Milieu', n: 18, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/841006.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Panamá.' },
      { id: 'pan19', name: 'Jovani WELCH', pos: 'Milieu', n: 19, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tm_jovani_welch.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Panamá.' },
      { id: 'pan20', name: 'César YANIS', pos: 'Milieu', n: 20, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1021117.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Panamá.' },
      { id: 'pan21', name: 'Alberto QUINTERO', pos: 'Attaquant', n: 21, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'https://img.sofascore.com/api/v1/player/221162/image', role: 'Remplaçant', bio: 'Joueur clé de la sélection Panamá.' },
      { id: 'pan22', name: 'Cecilio WATERMAN', pos: 'Attaquant', n: 22, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_cecilio_waterman.jpg', role: 'Remplaçant', bio: 'Joueur clé de la sélection Panamá.' },
      { id: 'pan23', name: 'Azarias LONDOÑO', pos: 'Attaquant', n: 23, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/1217929.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Panamá.' }
    ]
  },
  'Slovénie': {
    coach: 'Matjaž Kek', formation: '4-3-3', confederation: 'UEFA', titles: 0,
    players: [
      { id: 'svn1', name: 'Jan OBLAK', pos: 'Gardien', n: 1, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_jan_oblak.jpg', role: 'Titulaire', bio: 'Joueur clé de la sélection Slovénie.' },
      { id: 'svn2', name: 'Jaka BIJOL', pos: 'Défenseur', n: 2, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_jaka_bijol.jpg', role: 'Titulaire', bio: 'Joueur clé de la sélection Slovénie.' },
      { id: 'svn3', name: 'Miha BLAŽIČ', pos: 'Défenseur', n: 3, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/96552.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Slovénie.' },
      { id: 'svn4', name: 'Žan KARNIČNIK', pos: 'Défenseur', n: 4, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/896421.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Slovénie.' },
      { id: 'svn5', name: 'Erik JANŽA', pos: 'Défenseur', n: 5, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'https://img.sofascore.com/api/v1/player/944068/image', role: 'Titulaire', bio: 'Joueur clé de la sélection Slovénie.' },
      { id: 'svn6', name: 'Adam GNEZDA ČERIN', pos: 'Milieu', n: 6, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/843251.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Slovénie.' },
      { id: 'svn7', name: 'Timi MAX ELŠNIK', pos: 'Milieu', n: 7, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/827371.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Slovénie.' },
      { id: 'svn8', name: 'Petar STOJANOVIĆ', pos: 'Milieu', n: 8, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/227082.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Slovénie.' },
      { id: 'svn9', name: 'Jan MLAKAR', pos: 'Attaquant', n: 9, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/827367.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Slovénie.' },
      { id: 'svn10', name: 'Andraž ŠPORAR', pos: 'Attaquant', n: 10, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/166987.webp', role: 'Titulaire', bio: 'Joueur clé de la sélection Slovénie.' },
      { id: 'svn11', name: 'Benjamin ŠEŠKO', pos: 'Attaquant', n: 11, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/tsdb_benjamin_sesko.jpg', role: 'Titulaire', bio: 'Joueur clé de la sélection Slovénie.' },
      { id: 'svn12', name: 'Vid BELEC', pos: 'Gardien', n: 12, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/106713.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Slovénie.' },
      { id: 'svn13', name: 'Igor VEKIĆ', pos: 'Défenseur', n: 13, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/943735.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Slovénie.' },
      { id: 'svn14', name: 'David BREKALO', pos: 'Défenseur', n: 14, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/856583.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Slovénie.' },
      { id: 'svn15', name: 'Vanja DRKUŠIĆ', pos: 'Défenseur', n: 15, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/908617.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Slovénie.' },
      { id: 'svn16', name: 'Jure BALKOVEC', pos: 'Défenseur', n: 16, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/171625.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Slovénie.' },
      { id: 'svn17', name: 'Sandi LOVRIĆ', pos: 'Milieu', n: 17, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/575852.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Slovénie.' },
      { id: 'svn18', name: 'Jon GORENC STANKOVIĆ', pos: 'Milieu', n: 18, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/280565.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Slovénie.' },
      { id: 'svn19', name: 'Miha ZAJC', pos: 'Milieu', n: 19, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'https://img.sofascore.com/api/v1/player/139256/image', role: 'Remplaçant', bio: 'Joueur clé de la sélection Slovénie.' },
      { id: 'svn20', name: 'Benjamin VERBIČ', pos: 'Milieu', n: 20, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/153230.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Slovénie.' },
      { id: 'svn21', name: 'Tom HORVAT', pos: 'Attaquant', n: 21, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/906698.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Slovénie.' },
      { id: 'svn22', name: 'Žan VIDOTNIK', pos: 'Attaquant', n: 22, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'https://api.dicebear.com/7.x/initials/svg?seed=Žan+VIDOTNIK&backgroundColor=4f7e9f&textColor=ffffff&fontSize=38&fontWeight=700&size=200', role: 'Remplaçant', bio: 'Joueur clé de la sélection Slovénie.' },
      { id: 'svn23', name: 'Žan CELAR', pos: 'Attaquant', n: 23, age: 25, born: '01/01/2000', h: '1m80', club: 'Local Club', caps: 10, goals: 0, ast: 0, debut: '2020', photo: 'images/players/840740.webp', role: 'Remplaçant', bio: 'Joueur clé de la sélection Slovénie.' }
    ]
  },
  'Paraguay': { flag: '🇵🇾', coach: 'Gustavo Alfaro', formation: '4-3-3', confederation: 'CONMEBOL', titles: 0,
    players: [
      { id: 'par1', name: 'Antony SILVA', pos: 'Gardien', n: 1, age: 38, born: '13/07/1986', h: '1m88', club: 'Olimpia', caps: 82, goals: 0, ast: 0, debut: '2007', photo: 'https://img.sofascore.com/api/v1/player/331209/image', role: 'Titulaire', bio: 'Capitaine et gardien historique du Paraguay.' },
      { id: 'par2', name: 'Gustavo GÓMEZ', pos: 'Défenseur', n: 3, age: 32, born: '06/05/1993', h: '1m87', club: 'Palmeiras', caps: 78, goals: 5, ast: 1, debut: '2014', photo: 'images/players/tsdb_gustavo_gomez.jpg', role: 'Titulaire', bio: 'Défenseur central de Palmeiras, capitaine en défense.' },
      { id: 'par3', name: 'Junior ALONSO', pos: 'Défenseur', n: 4, age: 30, born: '11/04/1995', h: '1m88', club: 'Atletico MG', caps: 42, goals: 2, ast: 0, debut: '2018', photo: 'images/players/tsdb_junior_alonso.jpg', role: 'Titulaire', bio: 'Défenseur central solide.' },
      { id: 'par4', name: 'Fabián BALBUENA', pos: 'Défenseur', n: 6, age: 33, born: '23/08/1991', h: '1m86', club: 'Libertad', caps: 62, goals: 4, ast: 1, debut: '2012', photo: 'images/players/tsdb_fabian_balbuena.jpg', role: 'Titulaire', bio: 'Pilier défensif du Paraguay.' },
      { id: 'par5', name: 'Iván PIRIS', pos: 'Défenseur', n: 2, age: 31, born: '01/05/1993', h: '1m75', club: 'Cerro Porteño', caps: 38, goals: 1, ast: 3, debut: '2016', photo: 'images/players/tsdb_ivan_piris.jpg', role: 'Titulaire', bio: 'Latéral gauche fiable.' },
      { id: 'par6', name: 'Andrés CUBAS', pos: 'Milieu', n: 5, age: 28, born: '14/03/1997', h: '1m83', club: 'Nottm Forest', caps: 32, goals: 1, ast: 2, debut: '2020', photo: 'images/players/tsdb_andres_cubas.jpg', role: 'Titulaire', bio: 'Milieu défensif de Nottingham Forest.' },
      { id: 'par7', name: 'Richard SÁNCHEZ', pos: 'Milieu', n: 8, age: 29, born: '21/04/1996', h: '1m73', club: 'América MX', caps: 48, goals: 4, ast: 6, debut: '2019', photo: 'images/players/tsdb_richard_sanchez.jpg', role: 'Titulaire', bio: 'Milieu créatif, pièce maîtresse du jeu paraguayen.' },
      { id: 'par8', name: 'Miguel ALMIRÓN', pos: 'Milieu', n: 10, age: 31, born: '10/02/1994', h: '1m74', club: 'Newcastle', caps: 68, goals: 12, ast: 14, debut: '2015', photo: 'images/players/tsdb_miguel_almiron.jpg', role: 'Titulaire', bio: 'Star du Paraguay, milieu offensif de Newcastle.' },
      { id: 'par9', name: 'Antonio SANABRIA', pos: 'Attaquant', n: 9, age: 29, born: '04/03/1996', h: '1m83', club: 'Torino', caps: 52, goals: 18, ast: 6, debut: '2016', photo: 'images/players/tsdb_antonio_sanabria.jpg', role: 'Titulaire', bio: 'Avant-centre du Torino, buteur principal.' },
      { id: 'par10', name: 'Ángel ROMERO', pos: 'Attaquant', n: 11, age: 34, born: '23/09/1990', h: '1m78', club: 'Corinthians', caps: 58, goals: 22, ast: 10, debut: '2012', photo: 'images/players/tsdb_angel_romero.jpg', role: 'Titulaire', bio: 'Ailier expérimenté de Corinthians.' },
      { id: 'par11', name: 'Julio ENCISO', pos: 'Attaquant', n: 7, age: 21, born: '16/01/2004', h: '1m70', club: 'Brighton', caps: 28, goals: 8, ast: 5, debut: '2022', photo: 'images/players/tsdb_julio_enciso.jpg', role: 'Titulaire', bio: 'Prodige de Brighton, avenir du football paraguayen.' },
      { id: 'par12', name: 'Rodrigo MORÍNIGO', pos: 'Gardien', n: 12, age: 26, born: '12/03/1999', h: '1m85', club: 'Olimpia', caps: 8, goals: 0, ast: 0, debut: '2022', photo: '', role: 'Remplaçant', bio: 'Gardien remplaçant.' },
      { id: 'par13', name: 'Mathías VILLASANTI', pos: 'Milieu', n: 14, age: 26, born: '03/05/1999', h: '1m80', club: 'Grêmio', caps: 22, goals: 2, ast: 3, debut: '2022', photo: 'images/players/805078.webp', role: 'Remplaçant', bio: 'Milieu box-to-box de Grêmio.' },
      { id: 'par14', name: 'Braian OJEDA', pos: 'Milieu', n: 16, age: 26, born: '30/07/1998', h: '1m74', club: 'Nottm Forest', caps: 18, goals: 1, ast: 2, debut: '2021', photo: 'images/players/tsdb_braian_ojeda.jpg', role: 'Remplaçant', bio: 'Milieu de Nottingham Forest.' },
      { id: 'par15', name: 'Omar ALDERETE', pos: 'Défenseur', n: 15, age: 27, born: '26/12/1997', h: '1m84', club: 'Valencia', caps: 24, goals: 2, ast: 0, debut: '2020', photo: 'images/players/tsdb_omar_alderete.jpg', role: 'Remplaçant', bio: 'Défenseur central de Valencia.' }
    ]
  },
  'Norvège': { flag: '🇳🇴', coach: 'Ståle Solbakken', formation: '4-3-3', confederation: 'UEFA', titles: 0,
    players: [
      { id: 'nor1', name: 'Ørjan NYLAND', pos: 'Gardien', n: 1, age: 34, born: '10/09/1990', h: '1m91', club: 'Brentford', caps: 32, goals: 0, ast: 0, debut: '2013', photo: 'images/players/tsdb_rjan_nyland.jpg', role: 'Titulaire', bio: 'Gardien n°1 de Norvège.' },
      { id: 'nor2', name: 'Kristoffer AJER', pos: 'Défenseur', n: 5, age: 26, born: '17/04/1998', h: '1m96', club: 'Brentford', caps: 48, goals: 2, ast: 2, debut: '2018', photo: 'images/players/tsdb_kristoffer_ajer.jpg', role: 'Titulaire', bio: 'Défenseur central de Brentford, grande stature.' },
      { id: 'nor3', name: 'Leo ØSTIGÅRD', pos: 'Défenseur', n: 6, age: 25, born: '28/11/1999', h: '1m84', club: 'Napoli', caps: 28, goals: 2, ast: 0, debut: '2021', photo: 'images/players/tsdb_leo_stigard.jpg', role: 'Titulaire', bio: 'Défenseur central de Napoli.' },
      { id: 'nor4', name: 'Birger MELING', pos: 'Défenseur', n: 3, age: 30, born: '17/08/1994', h: '1m76', club: 'Rennes', caps: 28, goals: 1, ast: 4, debut: '2019', photo: 'images/players/tsdb_birger_meling.jpg', role: 'Titulaire', bio: 'Latéral gauche de Rennes.' },
      { id: 'nor5', name: 'Julian RYERSON', pos: 'Défenseur', n: 2, age: 27, born: '17/11/1997', h: '1m79', club: 'Dortmund', caps: 22, goals: 1, ast: 3, debut: '2021', photo: 'images/players/tsdb_julian_ryerson.jpg', role: 'Titulaire', bio: 'Latéral droit de Dortmund.' },
      { id: 'nor6', name: 'Sander BERGE', pos: 'Milieu', n: 4, age: 27, born: '14/02/1998', h: '1m94', club: 'Fulham', caps: 52, goals: 4, ast: 6, debut: '2018', photo: 'images/players/tsdb_sander_berge.jpg', role: 'Titulaire', bio: 'Milieu défensif de Fulham, colosse physique.' },
      { id: 'nor7', name: 'Martin ØDEGAARD', pos: 'Milieu', n: 8, age: 27, born: '17/12/1998', h: '1m78', club: 'Arsenal', caps: 62, goals: 14, ast: 18, debut: '2014', photo: 'images/players/tsdb_martin_degaard.jpg', role: 'Titulaire', bio: 'Capitaine de Norvège, star d\'Arsenal.' },
      { id: 'nor8', name: 'Fredrik AURSNES', pos: 'Milieu', n: 16, age: 29, born: '10/12/1995', h: '1m76', club: 'Benfica', caps: 38, goals: 3, ast: 5, debut: '2020', photo: 'images/players/tsdb_fredrik_aursnes.jpg', role: 'Titulaire', bio: 'Milieu polyvalent de Benfica.' },
      { id: 'nor9', name: 'Erling HAALAND', pos: 'Attaquant', n: 9, age: 25, born: '21/07/2000', h: '1m94', club: 'Man. City', caps: 42, goals: 33, ast: 6, debut: '2019', photo: 'images/players/tsdb_erling_haaland.jpg', role: 'Titulaire', bio: 'Machine à buts de Man City. Meilleur buteur de Norvège.' },
      { id: 'nor10', name: 'Alexander SØRLOTH', pos: 'Attaquant', n: 11, age: 29, born: '05/12/1995', h: '1m96', club: 'Atlético Madrid', caps: 52, goals: 24, ast: 8, debut: '2015', photo: 'https://img.sofascore.com/api/v1/player/309078/image', role: 'Titulaire', bio: 'Grand attaquant de l\'Atlético Madrid.' },
      { id: 'nor11', name: 'Antonio NUSA', pos: 'Attaquant', n: 7, age: 20, born: '20/06/2004', h: '1m78', club: 'Leverkusen', caps: 18, goals: 5, ast: 4, debut: '2023', photo: 'images/players/tsdb_antonio_nusa.jpg', role: 'Titulaire', bio: 'Prodige de Leverkusen, ailier explosif.' },
      { id: 'nor12', name: 'Matz SELS', pos: 'Gardien', n: 12, age: 33, born: '26/02/1992', h: '1m89', club: 'Nottm Forest', caps: 8, goals: 0, ast: 0, debut: '2022', photo: 'images/players/tsdb_matz_sels.jpg', role: 'Remplaçant', bio: 'Gardien remplaçant.' },
      { id: 'nor13', name: 'Jørgen STRAND LARSEN', pos: 'Attaquant', n: 14, age: 25, born: '06/02/2000', h: '1m93', club: 'Celta Vigo', caps: 22, goals: 8, ast: 3, debut: '2022', photo: 'https://img.sofascore.com/api/v1/player/876599/image', role: 'Remplaçant', bio: 'Attaquant de Celta Vigo.' },
      { id: 'nor14', name: 'Mathias NORMANN', pos: 'Milieu', n: 15, age: 29, born: '28/05/1996', h: '1m75', club: 'Standard Liège', caps: 28, goals: 2, ast: 4, debut: '2019', photo: 'images/players/805078.webp', role: 'Remplaçant', bio: 'Milieu technique.' },
      { id: 'nor15', name: 'Andreas HANCHE-OLSEN', pos: 'Défenseur', n: 17, age: 26, born: '19/07/1999', h: '1m89', club: 'Gent', caps: 14, goals: 1, ast: 0, debut: '2022', photo: 'images/players/tsdb_andreas_hanche_olsen.jpg', role: 'Remplaçant', bio: 'Défenseur central en progression.' }
    ]
  },
  'Cap-Vert': { flag: '🇨🇻', coach: 'Bubista', formation: '4-3-3', confederation: 'CAF', titles: 0,
    players: [
      { id: 'cpv1', name: 'Vozinha', pos: 'Gardien', n: 1, age: 32, born: '22/01/1993', h: '1m82', club: 'Leganés', caps: 28, goals: 0, ast: 0, debut: '2016', photo: 'images/players/tsdb_vozinha.jpg', role: 'Titulaire', bio: 'Gardien n°1 du Cap-Vert.' },
      { id: 'cpv2', name: 'Stopira', pos: 'Défenseur', n: 4, age: 34, born: '10/03/1991', h: '1m84', club: 'Portimonense', caps: 62, goals: 2, ast: 1, debut: '2013', photo: 'https://img.sofascore.com/api/v1/player/59609/image', role: 'Titulaire', bio: 'Défenseur expérimenté, pilier de la défense.' },
      { id: 'cpv3', name: 'Léo ANDRADE', pos: 'Défenseur', n: 3, age: 27, born: '15/04/1998', h: '1m80', club: 'Nacional', caps: 22, goals: 1, ast: 2, debut: '2019', photo: 'images/players/tsdb_leo_andrade.jpg', role: 'Titulaire', bio: 'Latéral gauche fiable.' },
      { id: 'cpv4', name: 'Roberto LOPES', pos: 'Défenseur', n: 5, age: 29, born: '22/05/1995', h: '1m87', club: 'Shamrock Rovers', caps: 38, goals: 3, ast: 1, debut: '2018', photo: 'images/players/tsdb_roberto_lopes.jpg', role: 'Titulaire', bio: 'Défenseur central solide.' },
      { id: 'cpv5', name: 'Diney BORGES', pos: 'Défenseur', n: 2, age: 26, born: '08/11/1998', h: '1m78', club: 'Guingamp', caps: 18, goals: 0, ast: 3, debut: '2021', photo: 'https://img.sofascore.com/api/v1/player/784677/image', role: 'Titulaire', bio: 'Latéral droit actif.' },
      { id: 'cpv6', name: 'Kenny ROCHA', pos: 'Milieu', n: 8, age: 28, born: '22/09/1996', h: '1m80', club: 'SC Farense', caps: 32, goals: 3, ast: 5, debut: '2019', photo: 'images/players/75756.webp', role: 'Titulaire', bio: 'Milieu défensif combatif.' },
      { id: 'cpv7', name: 'Jamiro MONTEIRO', pos: 'Milieu', n: 10, age: 31, born: '25/11/1994', h: '1m68', club: 'Sporting CP', caps: 48, goals: 8, ast: 10, debut: '2016', photo: 'images/players/tsdb_jamiro_monteiro.jpg', role: 'Titulaire', bio: 'Meneur de jeu technique de Sporting CP.' },
      { id: 'cpv8', name: 'Januário FURTADO', pos: 'Milieu', n: 14, age: 25, born: '12/03/2000', h: '1m75', club: 'SC Braga', caps: 16, goals: 2, ast: 4, debut: '2022', photo: '', role: 'Titulaire', bio: 'Milieu dynamique en montée en puissance.' },
      { id: 'cpv9', name: 'Ryan MENDES', pos: 'Attaquant', n: 7, age: 34, born: '08/03/1991', h: '1m70', club: 'Maccabi Tel Aviv', caps: 62, goals: 18, ast: 12, debut: '2012', photo: 'https://img.sofascore.com/api/v1/player/52797/image', role: 'Titulaire', bio: 'Ailier vétéran, leader offensif.' },
      { id: 'cpv10', name: 'Garry RODRIGUES', pos: 'Attaquant', n: 11, age: 33, born: '27/08/1992', h: '1m74', club: 'Al-Hilal', caps: 52, goals: 14, ast: 10, debut: '2016', photo: 'images/players/tsdb_garry_rodrigues.jpg', role: 'Titulaire', bio: 'Ailier vif, pièce maîtresse de l\'attaque.' },
      { id: 'cpv11', name: 'Djaniny TAVARES', pos: 'Attaquant', n: 9, age: 32, born: '27/02/1993', h: '1m86', club: 'Al-Qadsia', caps: 42, goals: 24, ast: 6, debut: '2015', photo: 'https://img.sofascore.com/api/v1/player/845789/image', role: 'Titulaire', bio: 'Meilleur buteur du Cap-Vert.' },
      { id: 'cpv12', name: 'Josimar DIAS', pos: 'Gardien', n: 12, age: 28, born: '14/07/1997', h: '1m85', club: 'FC Arouca', caps: 6, goals: 0, ast: 0, debut: '2023', photo: 'images/players/tsdb_josimar_dias.jpg', role: 'Remplaçant', bio: 'Gardien remplaçant.' },
      { id: 'cpv13', name: 'Steven FORTES', pos: 'Défenseur', n: 15, age: 31, born: '02/02/1994', h: '1m80', club: 'Rio Ave', caps: 38, goals: 1, ast: 2, debut: '2018', photo: 'images/players/tsdb_steven_fortes.jpg', role: 'Remplaçant', bio: 'Défenseur polyvalent.' },
      { id: 'cpv14', name: 'Lisandro SEMEDO', pos: 'Milieu', n: 16, age: 27, born: '18/06/1998', h: '1m73', club: 'Nacional', caps: 12, goals: 1, ast: 3, debut: '2022', photo: 'images/players/tsdb_lisandro_semedo.jpg', role: 'Remplaçant', bio: 'Milieu offensif.' },
      { id: 'cpv15', name: 'Willy SEMEDO', pos: 'Attaquant', n: 17, age: 26, born: '20/01/1999', h: '1m78', club: 'Vitória SC', caps: 10, goals: 3, ast: 2, debut: '2023', photo: 'https://img.sofascore.com/api/v1/player/889052/image', role: 'Remplaçant', bio: 'Jeune attaquant en progression.' }
    ]
  }
};

// ── ORIGINAL LINEUPS BACKUP (before squad_patch overwrites) ───────────
// squad_patch.js replaces TEAMS[t].players with official squads (all 'Remplaçant').
// We save the curated match lineups here so the pitch panel can use them.
const ORIGINAL_LINEUPS = {};
(function() {
  Object.entries(TEAMS).forEach(([name, td]) => {
    if (td && td.players) ORIGINAL_LINEUPS[name] = td.players.slice();
  });
})();

// ── PALMARES DATA ─────────────────────────────────────────────────────
const PALMARES = {
  'France': {
    cm: 2, cont: 2, contNom: 'Euros', partCM: 16, bestCM: '🏆 Champion',
    buteur: 'T. Henry — 51 ⚽', recordman: 'L. Thuram — 142 🎽',
    trophees: ['CM 1998', 'CM 2018', 'Euro 1984', 'Euro 2000']
  },
  'Espagne': {
    cm: 1, cont: 4, contNom: 'Euros', partCM: 16, bestCM: '🏆 Champion',
    buteur: 'D. Villa — 59 ⚽', recordman: 'S. Ramos — 180 🎽',
    trophees: ['CM 2010', 'Euro 1964', 'Euro 2008', 'Euro 2012', 'Euro 2024']
  },
  'Argentine': {
    cm: 3, cont: 15, contNom: 'Copa América', partCM: 18, bestCM: '🏆 Champion',
    buteur: 'L. Messi — 109 ⚽', recordman: 'L. Messi — 191 🎽',
    trophees: ['CM 1978', 'CM 1986', 'CM 2022', 'Copa 2021', 'Copa 1993']
  },
  'Brésil': {
    cm: 5, cont: 9, contNom: 'Copa América', partCM: 22, bestCM: '🏆 Champion',
    buteur: 'Neymar — 79 ⚽', recordman: 'Cafu — 142 🎽',
    trophees: ['CM 1958', 'CM 1962', 'CM 1970', 'CM 1994', 'CM 2002']
  },
  'Portugal': {
    cm: 0, cont: 1, contNom: 'Euros', partCM: 8, bestCM: '🥉 3e place (1966)',
    buteur: 'C. Ronaldo — 133 ⚽', recordman: 'C. Ronaldo — 220+ 🎽',
    trophees: ['Euro 2016', 'Ligue des Nations 2019']
  },
  'Angleterre': {
    cm: 1, cont: 0, contNom: 'Euros', partCM: 16, bestCM: '🏆 Champion (1966)',
    buteur: 'W. Rooney — 53 ⚽', recordman: 'P. Shilton — 125 🎽',
    trophees: ['CM 1966']
  },
  'Allemagne': {
    cm: 4, cont: 3, contNom: 'Euros', partCM: 20, bestCM: '🏆 Champion',
    buteur: 'M. Klose — 71 ⚽', recordman: 'L. Matthäus — 150 🎽',
    trophees: ['CM 1954', 'CM 1974', 'CM 1990', 'CM 2014', 'Euro 1972', 'Euro 1980', 'Euro 1996']
  },
  'Pays-Bas': {
    cm: 0, cont: 1, contNom: 'Euros', partCM: 11, bestCM: '🥈 Finaliste (1974,1978,2010)',
    buteur: 'R. van Persie — 50 ⚽', recordman: 'E. van der Sar — 130 🎽',
    trophees: ['Euro 1988']
  },
  'Belgique': {
    cm: 0, cont: 0, contNom: 'Euros', partCM: 14, bestCM: '🥉 3e place (1986,2018)',
    buteur: 'R. Lukaku — 68 ⚽', recordman: 'J. Vertonghen — 150 🎽',
    trophees: ['Médaille Bronze 1986', 'Médaille Bronze 2018']
  },
  'Maroc': {
    cm: 0, cont: 1, contNom: 'CAN', partCM: 6, bestCM: '🏅 Demi-finales (2022)',
    buteur: 'Y. En-Nesyri — 20 ⚽', recordman: 'N. Mazraoui — 50+ 🎽',
    trophees: ['CAN 1976', 'Demi-finaliste CM 2022']
  },
  'Japon': {
    cm: 0, cont: 4, contNom: "Coupe d'Asie", partCM: 7, bestCM: '🔵 Huitièmes (2002,2010,2018)',
    buteur: 'K. Honda — 37 ⚽', recordman: 'H. Nagatomo — 136 🎽',
    trophees: ['Asie 1992', 'Asie 2000', 'Asie 2004', 'Asie 2011']
  },
  'Colombie': {
    cm: 0, cont: 1, contNom: 'Copa América', partCM: 6, bestCM: '🔵 Quarts (2014)',
    buteur: 'R. Falcao — 36 ⚽', recordman: 'C. Sánchez — 128 🎽',
    trophees: ['Copa América 2001']
  },
  'Uruguay': {
    cm: 2, cont: 15, contNom: 'Copa América', partCM: 14, bestCM: '🏆 Champion',
    buteur: 'L. Suárez — 68 ⚽', recordman: 'M. Pereira — 134 🎽',
    trophees: ['CM 1930', 'CM 1950', 'Copa×15']
  },
  'États-Unis': {
    cm: 0, cont: 6, contNom: 'Gold Cup', partCM: 11, bestCM: '🥉 3e place (1930)',
    buteur: 'L. Donovan — 57 ⚽', recordman: 'C. Ramos — 90+ 🎽',
    trophees: ['Gold Cup×6', '3e CM 1930']
  },
  'Mexique': {
    cm: 0, cont: 11, contNom: 'Gold Cup', partCM: 17, bestCM: '🔵 Quarts (7 fois)',
    buteur: 'J. Hernández — 52 ⚽', recordman: 'A. Guardado — 180 🎽',
    trophees: ['Gold Cup×11']
  },
  'Équateur': {
    cm: 0, cont: 0, contNom: 'Copa América', partCM: 4, bestCM: '🔵 Huitièmes (2006)',
    buteur: 'E. Valencia — 37 ⚽', recordman: 'I. Burbano — 109 🎽',
    trophees: ['Huitièmes CM 2006']
  },
  'Corée du Sud': {
    cm: 0, cont: 2, contNom: "Coupe d'Asie", partCM: 11, bestCM: '🏅 4e place (2002)',
    buteur: 'Cha Bum-kun — 58 ⚽', recordman: 'Oh Beom-seok — 136 🎽',
    trophees: ['Asie 1956', 'Asie 1960', '4e CM 2002']
  },
  'Afrique du Sud': {
    cm: 0, cont: 1, contNom: 'CAN', partCM: 3, bestCM: '🔵 Groupes',
    buteur: 'B. McCarthy — 31 ⚽', recordman: 'A. Khune — 102 🎽',
    trophees: ['CAN 1996']
  },
  'Canada': {
    cm: 0, cont: 1, contNom: 'Gold Cup', partCM: 3, bestCM: '🔵 Groupes (2022)',
    buteur: 'C. Larin — 30 ⚽', recordman: 'J. De Rosario — 81 🎽',
    trophees: ['Gold Cup 2000']
  },
  'Suisse': {
    cm: 0, cont: 0, contNom: 'Euros', partCM: 12, bestCM: '🔵 Quarts (1934,1938,1954)',
    buteur: 'A. Bögli — 34 ⚽', recordman: 'H. Shaqiri — 123 🎽',
    trophees: ['Quarts-finaliste 1934,1938,1954']
  },
  'Qatar': {
    cm: 0, cont: 1, contNom: "Coupe d'Asie", partCM: 2, bestCM: '🔵 Groupes (2022)',
    buteur: 'A. Afif — 40 ⚽', recordman: 'H. Al-Haydos — 167 🎽',
    trophees: ['Asie 2019', 'Asie 2023']
  },
  'Serbie': {
    cm: 0, cont: 0, contNom: 'Euros', partCM: 3, bestCM: '🔵 Groupes',
    buteur: 'S. Milinković-Savić — 20+ ⚽', recordman: 'D. Stojković — 84 🎽',
    trophees: ['Héritière de la Yougoslavie']
  },
  'Croatie': {
    cm: 0, cont: 0, contNom: 'Euros', partCM: 6, bestCM: '🥈 Finaliste (2018)',
    buteur: 'D. Šuker — 45 ⚽', recordman: 'L. Modrić — 180 🎽',
    trophees: ['Finaliste CM 2018', '3e CM 2022']
  },
  'Écosse': {
    cm: 0, cont: 0, contNom: 'Euros', partCM: 8, bestCM: '🔵 Groupes',
    buteur: 'K. Dalglish — 30 ⚽', recordman: 'J. Leighton — 91 🎽',
    trophees: ['Sortie groupes CM multiple']
  },
  'Australie': {
    cm: 0, cont: 1, contNom: "Coupe d'Asie", partCM: 6, bestCM: '🔵 Quarts (2006,2023)',
    buteur: 'T. Cahill — 50 ⚽', recordman: 'M. Schwarzer — 109 🎽',
    trophees: ['Asie 2015']
  },
  'Slovaquie': {
    cm: 0, cont: 0, contNom: 'Euros', partCM: 2, bestCM: '🔵 Huitièmes (2010)',
    buteur: 'R. Vittek — 23 ⚽', recordman: 'M. Škriniar — 75 🎽',
    trophees: ['Huitièmes CM 2010']
  },
  'Curaçao': {
    cm: 0, cont: 0, contNom: 'Coupe CONCACAF', partCM: 1, bestCM: '🏁 1re participation',
    buteur: 'B. Kuwas — 10 ⚽', recordman: 'J. Bacuna — 50 🎽',
    trophees: ['Première qualification CM 2026']
  },
  'Tunisie': {
    cm: 0, cont: 1, contNom: 'CAN', partCM: 6, bestCM: '🔵 Groupes',
    buteur: 'I. Khémais — 36 ⚽', recordman: 'S. Boumnijel — 97 🎽',
    trophees: ['CAN 2004']
  },
  'Pérou': {
    cm: 0, cont: 2, contNom: 'Copa América', partCM: 5, bestCM: '🔵 Quarts (1970)',
    buteur: 'P. Cubillas — 26 ⚽', recordman: 'R. Mifflin — 147 🎽',
    trophees: ['Copa 1939', 'Copa 1975']
  },
  'Sénégal': {
    cm: 0, cont: 1, contNom: 'CAN', partCM: 4, bestCM: '🏅 Quarts de finale (2002)',
    buteur: 'S. Mané — 34 ⚽', recordman: 'K. Koulibaly — 103 🎽',
    trophees: ['CAN 2021', 'Quarts CM 2002']
  },
  'Égypte': {
    cm: 0, cont: 7, contNom: 'CAN', partCM: 3, bestCM: '🔵 Groupes',
    buteur: 'H. El-Khatib — 69 ⚽', recordman: 'A. El-Hadary — 159 🎽',
    trophees: ['CAN 1957', 'CAN 1959', 'CAN 1986', 'CAN 1998', 'CAN 2006', 'CAN 2008', 'CAN 2010']
  },
  'Iran': {
    cm: 0, cont: 3, contNom: "Coupe d'Asie", partCM: 6, bestCM: '🔵 Groupes',
    buteur: 'A. Daei — 109 ⚽', recordman: 'J. Nekounam — 151 🎽',
    trophees: ['Asie 1968', 'Asie 1972', 'Asie 1976']
  },
  'Nouvelle-Zélande': {
    cm: 0, cont: 4, contNom: 'OFC Nations Cup', partCM: 3, bestCM: '🔵 Groupes (2010)',
    buteur: 'V. Lochhead — 28 ⚽', recordman: 'I. Fyfe — 90 🎽',
    trophees: ['OFC×4']
  },
  'Arabie saoudite': {
    cm: 0, cont: 3, contNom: "Coupe d'Asie", partCM: 6, bestCM: '🔵 Huitièmes (1994)',
    buteur: 'S. Al-Jaber — 46 ⚽', recordman: 'M. Al-Deayea — 181 🎽',
    trophees: ['Asie 1984', 'Asie 1988', 'Asie 1996']
  },
  'Algérie': {
    cm: 0, cont: 2, contNom: 'CAN', partCM: 4, bestCM: '🔵 Huitièmes (2014)',
    buteur: 'I. Slimani — 42 ⚽', recordman: 'I. Belloucha — 100+ 🎽',
    trophees: ['CAN 1990', 'CAN 2019']
  },
  'Autriche': {
    cm: 0, cont: 0, contNom: 'Euros', partCM: 7, bestCM: '🥉 3e place (1954)',
    buteur: 'T. Polster — 44 ⚽', recordman: 'A. Ivanschitz — 100+ 🎽',
    trophees: ['3e place CM 1954']
  },
  'Jordanie': {
    cm: 0, cont: 0, contNom: "Coupe d'Asie", partCM: 1, bestCM: '🏁 1re participation',
    buteur: 'Ahmad Hayel — 20 ⚽', recordman: 'Ahmad Hayel — 150+ 🎽',
    trophees: ['Première qualification CM 2026']
  },
  'Cameroun': {
    cm: 0, cont: 5, contNom: 'CAN', partCM: 8, bestCM: '🔵 Quarts (1990)',
    buteur: "S. Eto'o — 56 ⚽", recordman: 'R. Song — 137 🎽',
    trophees: ['CAN 1984', 'CAN 1988', 'CAN 2000', 'CAN 2002', 'CAN 2017']
  },
  'Ouzbékistan': {
    cm: 0, cont: 0, contNom: "Coupe d'Asie", partCM: 1, bestCM: '🏁 1re participation',
    buteur: 'E. Shodiyev — 30 ⚽', recordman: 'O. Shomurodov — 60+ 🎽',
    trophees: ['Première qualification CM 2026']
  },
  'Ghana': {
    cm: 0, cont: 4, contNom: 'CAN', partCM: 4, bestCM: '🔵 Quarts (2010)',
    buteur: 'A. Gyan — 51 ⚽', recordman: 'A. Gyan — 109 🎽',
    trophees: ['CAN 1963', 'CAN 1965', 'CAN 1978', 'CAN 1982']
  },
  'Panamá': {
    cm: 0, cont: 0, contNom: 'Gold Cup', partCM: 2, bestCM: '🔵 Groupes',
    buteur: 'B. Tejada — 43 ⚽', recordman: 'R. Torres — 130 🎽',
    trophees: ['Groupes CM 2018']
  },
  'Slovénie': {
    cm: 0, cont: 0, contNom: 'Euros', partCM: 3, bestCM: '🔵 Groupes',
    buteur: 'S. Osterc — 35 ⚽', recordman: 'B. Cesar — 101 🎽',
    trophees: ['Quarts Euro 2000']
  }
};

// ── APP STATE ─────────────────────────────────────────────────────────
// ── CONFIG LIVE ───────────────────────────────────────────────────────
// Source primaire : API ESPN directe (CORS ouvert). Fallback : NAS local.
const ESPN_SCOREBOARD_URL = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard';

// Résumés vidéo (YouTube beIN Sports). Clé = scoreKey "A_0".
// À compléter au fil des matchs ; sinon lien de recherche YouTube auto.
const MATCH_VIDEOS = {
  'A_1': 'https://youtu.be/YQoCE9_WgAs',
};
// Lien dispo 1h après la fin du match
function getMatchVideoUrl(key, m) {
  if (MATCH_VIDEOS[key]) return MATCH_VIDEOS[key];
  const q = encodeURIComponent(`beIN Sports ${m.h} - ${m.a}`);
  return `https://www.youtube.com/results?search_query=${q}`;
}
function isMatchVideoReady(m) {
  if (!m.utc) return false;
  const end = new Date(m.utc).getTime() + (115 + 60) * 60 * 1000; // ~fin + 1h
  return Date.now() >= end;
}
const NAS_SCORES_URL = 'http://192.168.1.100/wc2026/scores.json';
const LIVE_POLL_INTERVAL = 45000; // 45s — but/carton affiché en moins d'une minute

// Migration calendrier réel (v2) : les anciens scores étaient keyés sur un
// ordre de matchs obsolète — on repart propre, l'API ESPN repeuple tout.
if (!localStorage.getItem('wc2026_schedule_v2')) {
  ['wc2026_scores','wc2026_scorers','wc2026_goalMeta','wc2026_matchDetails'].forEach(k => localStorage.removeItem(k));
  localStorage.setItem('wc2026_schedule_v2', '1');
}

const state = {
  view: 'groups',
  panelStack: [],
  scores:       JSON.parse(localStorage.getItem('wc2026_scores')       || '{}'),
  scorers:      JSON.parse(localStorage.getItem('wc2026_scorers')      || '{}'),
  goalMeta:     JSON.parse(localStorage.getItem('wc2026_goalMeta')     || '{}'),
  matchDetails: JSON.parse(localStorage.getItem('wc2026_matchDetails') || '{}'),
  liveInfo:     {},   // scoreKey → { state:'pre'|'in'|'post', clock, detail }
  nasConnected: false,
  lastNasUpdate: null,
};

const VENUE_CAPACITY = {
  'Estadio Azteca, Mexico City':        87523,
  'AT&T Stadium, Dallas':               80000,
  'Estadio Akron, Guadalajara':         46456,
  'Levis Stadium, San Jose':            68500,
  'BC Place, Vancouver':                54500,
  'Stade de Montréal':                  46000,
  'BMO Field, Toronto':                 45000,
  'MetLife Stadium, NY':                82500,
  'Gillette Stadium, Boston':           65878,
  'Lincoln Financial, Phila.':          69796,
  'Allianz Field, Minneapolis':         49738,
  'Arrowhead Stadium, KC':              76416,
  'SoFi Stadium, LA':                   70240,
  'Hard Rock Stadium, Miami':           65326,
  'Camping World Stadium, Orlando':     60219,
  'Estadio BBVA, Monterrey':            51350,
  'NRG Stadium, Houston':               72220,
  'Mercedes-Benz Stadium, Atlanta':     71000,
  'Lumen Field, Seattle':               68740,
};

// ── MAPPING noms ESPN (EN) → noms app (FR) ────────────────────────────
const ESPN_TO_FR = {
  'France':'France','Spain':'Espagne','Argentina':'Argentine','Brazil':'Brésil',
  'Portugal':'Portugal','England':'Angleterre','Germany':'Allemagne','Netherlands':'Pays-Bas',
  'Belgium':'Belgique','Morocco':'Maroc','Japan':'Japon','Colombia':'Colombie',
  'Uruguay':'Uruguay','Mexico':'Mexique','South Korea':'Corée du Sud',
  'South Africa':'Afrique du Sud','Canada':'Canada','Switzerland':'Suisse',
  'Qatar':'Qatar','Serbia':'Serbie','Croatia':'Croatie','Australia':'Australie',
  'Slovakia':'Slovaquie',"Côte d'Ivoire":"Côte d'Ivoire",'Ivory Coast':"Côte d'Ivoire",
  'Curacao':'Curaçao','Tunisia':'Tunisie','Peru':'Pérou','Senegal':'Sénégal',
  'Egypt':'Égypte','Iran':'Iran','New Zealand':'Nouvelle-Zélande',
  'Saudi Arabia':'Arabie saoudite','Algeria':'Algérie','Austria':'Autriche',
  'Jordan':'Jordanie','Cameroon':'Cameroun','Uzbekistan':'Ouzbékistan',
  'Ghana':'Ghana','Panama':'Panamá','Slovenia':'Slovénie','Scotland':'Écosse',
  'Ecuador':'Équateur','Paraguay':'Paraguay','Norway':'Norvège',
  'Cape Verde':'Cap-Vert','United States':'États-Unis','USA':'États-Unis',
  'Czechia':'Rép. tchèque','Czech Republic':'Rép. tchèque',
  'Türkiye':'Turquie','Turkey':'Turquie','Sweden':'Suède','Iraq':'Irak',
  'Haiti':'Haïti','Bosnia-Herzegovina':'Bosnie-Herzégovine',
  'Congo DR':'RD Congo','DR Congo':'RD Congo','Curaçao':'Curaçao',
};

// ── LIVE SCORES FETCH ─────────────────────────────────────────────────
// Normalise un event ESPN brut → { home, away, homeScore, awayScore,
// status, clock, completed, goals/cards par camp }
function _normalizeEspnEvent(e) {
  const comp = (e.competitions || [])[0] || {};
  const cs = comp.competitors || [];
  const home = cs.find(c => c.homeAway === 'home') || {};
  const away = cs.find(c => c.homeAway === 'away') || {};
  const st = (e.status || {}).type || {};
  const homeId = home.team?.id, awayId = away.team?.id;

  const goals = { home: [], away: [] };
  const yellows = { home: [], away: [] };
  const reds = { home: [], away: [] };

  (comp.details || []).forEach(d => {
    const typeTxt = (d.type?.text || '').toLowerCase();
    const min = d.clock?.displayValue || '';
    const who = (d.athletesInvolved || [])[0]?.displayName || '';
    let side = String(d.team?.id) === String(homeId) ? 'home' : 'away';
    if (d.scoringPlay) {
      const own = typeTxt.includes('own goal');
      if (own) side = side === 'home' ? 'away' : 'home';
      const pen = typeTxt.includes('penalty');
      goals[side].push(`${min} ${who}${own ? ' (csc)' : pen ? ' (pen)' : ''}`.trim());
    } else if (d.yellowCard || typeTxt.includes('yellow')) {
      yellows[side].push(`${min} ${who}`.trim());
    } else if (d.redCard || typeTxt.includes('red')) {
      reds[side].push(`${min} ${who}`.trim());
    }
  });

  return {
    id: e.id,
    home: home.team?.displayName || '',
    away: away.team?.displayName || '',
    homeScore: home.score, awayScore: away.score,
    status: st.state || '',
    clock: (e.status || {}).displayClock || '',
    detail: st.shortDetail || '',
    completed: !!st.completed,
    goals, yellows, reds,
  };
}

async function fetchLiveScores(dateRange) {
  let events = null;
  let source = 'espn';

  // 1) API ESPN directe (dateRange optionnel : 'YYYYMMDD-YYYYMMDD' pour backfill)
  try {
    const url = ESPN_SCOREBOARD_URL + (dateRange ? `?dates=${dateRange}&limit=200&t=` : '?t=') + Date.now();
    const res = await fetch(url, {
      cache: 'no-store',
      signal: AbortSignal.timeout(dateRange ? 15000 : 8000)
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    events = (data.events || []).map(_normalizeEspnEvent);
  } catch (err) {
    console.warn('[LIVE] ESPN fetch failed:', err.message);
  }

  // 2) Fallback NAS (format pré-normalisé, sans buteurs)
  if (!events) {
    source = 'nas';
    try {
      const res = await fetch(NAS_SCORES_URL + '?t=' + Date.now(), {
        cache: 'no-store',
        signal: AbortSignal.timeout(8000)
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      events = data.events || [];
    } catch (err) {
      console.warn('[LIVE] NAS fetch failed:', err.message);
      state.nasConnected = false;
      updateNasIndicator(false);
      return;
    }
  }

  let changed = false;

  events.forEach(ev => {
    const homeFR = ESPN_TO_FR[ev.home] || ev.home;
    const awayFR = ESPN_TO_FR[ev.away] || ev.away;

    // Trouver la clé dans nos groupes
    let foundKey = null, swapped = false;
    GROUPS.forEach(g => {
      g.matches.forEach((m, i) => {
        if (m.h === homeFR && m.a === awayFR) { foundKey = g.id + '_' + i; swapped = false; }
        else if (m.h === awayFR && m.a === homeFR) { foundKey = g.id + '_' + i; swapped = true; }
      });
    });
    if (!foundKey) return;

    // Statut + chrono live (toujours, même sans score)
    state.liveInfo[foundKey] = {
      state: ev.completed ? 'post' : (ev.status || 'pre'),
      clock: ev.clock || '',
      detail: ev.detail || '',
      eventId: ev.id || (state.liveInfo[foundKey] || {}).eventId || null,
    };

    // Buteurs + cartons (ESPN uniquement)
    if (ev.goals) {
      const pick = (o) => swapped ? { home: o.away, away: o.home } : { home: o.home, away: o.away };
      const goals = pick(ev.goals);
      if (goals.home.length || goals.away.length ||
          (state.scorers[foundKey] && JSON.stringify(state.scorers[foundKey]) !== JSON.stringify(goals))) {
        if (JSON.stringify(state.scorers[foundKey] || null) !== JSON.stringify(goals)) {
          state.scorers[foundKey] = goals;
          changed = true;
        }
      }
      const yellows = pick(ev.yellows), reds = pick(ev.reds);
      if (yellows.home.length || yellows.away.length || reds.home.length || reds.away.length) {
        const d = state.matchDetails[foundKey] || (state.matchDetails[foundKey] = {});
        if (JSON.stringify(d.yellows || null) !== JSON.stringify(yellows) ||
            JSON.stringify(d.reds || null) !== JSON.stringify(reds)) {
          d.yellows = yellows;
          d.reds = reds;
          changed = true;
        }
      }
    }

    // Score disponible ?
    const hScore = ev.homeScore;
    const aScore = ev.awayScore;
    if (hScore === '' || aScore === '' || hScore == null) return;

    const newScore = swapped ? `${aScore}-${hScore}` : `${hScore}-${aScore}`;
    const oldScore = state.scores[foundKey] || '';

    if (newScore !== oldScore && (ev.status === 'in' || ev.status === 'post' || ev.completed)) {
      // Détecter quel camp a marqué
      const oldParts = oldScore.split('-').map(s => parseInt(s) || 0);
      const newParts = newScore.split('-').map(s => parseInt(s) || 0);
      let lastTeam = null;
      if (newParts[0] > oldParts[0]) lastTeam = 'home';
      else if (newParts[1] > oldParts[1]) lastTeam = 'away';

      state.scores[foundKey] = newScore;
      liveUpdateGroupScore(foundKey);
      if (lastTeam) {
        state.goalMeta[foundKey] = { changedAt: Date.now(), lastTeam };
        setTimeout(() => { renderCalendar(); renderLiveView(); }, 5100);
      }
      changed = true;
    }
  });

  state.nasConnected = true;
  state.lastNasUpdate = new Date();

  if (changed) {
    saveScores();
    renderCalendar();
    renderLiveView();
    renderGroups();
  } else if (state.view === 'live') {
    // Rafraîchit le chrono même sans but
    renderLiveView();
  }
  // Toujours recalculer le classement s'il est affiché : garantit que le total
  // visible = total réel même si des scores arrivent après le 1er rendu.
  if (state.view === 'classement' && typeof renderLeaderboard === 'function') renderLeaderboard();

  updateNasIndicator(true, source);
}

function updateNasIndicator(ok, source) {
  const btn = document.getElementById('nav-live-btn');
  if (btn) {
    btn.title = ok
      ? `LIVE — ${source === 'nas' ? 'NAS' : 'ESPN'} connecté (${new Date().toLocaleTimeString()})`
      : 'LIVE — source scores non disponible';
    btn.style.opacity = ok ? '1' : '0.5';
  }
}

// ── RÉSUMÉ DE MATCH (page stats après clic sur un match joué) ─────────
function gpMatchClick(gid, i) {
  const key = gid + '_' + i;
  if (state.scores[key] && window.matchMedia('(max-width: 768px)').matches) {
    openMatchSummary(gid, i);
  } else {
    openMatchPitchPanel(gid, i);
  }
}

function openMatchSummary(gid, i) {
  const g = GROUPS.find(x => x.id === gid);
  const m = g?.matches[i];
  if (!m) return;
  const key = gid + '_' + i;
  const score = state.scores[key] || m.s || '–';
  const hInfo = g.teams.find(t => t.name === m.h);
  const aInfo = g.teams.find(t => t.name === m.a);
  const sc = state.scorers[key] || { home: [], away: [] };
  const det = state.matchDetails[key] || {};
  const scoreDisp = score && score.includes('-') ? score.replace('-', ' – ') : score;

  // drapeaux ronds comme l'onglet Matchs
  const flagEl = (info) => {
    const src = getFlagImg(info?.code);
    return src ? `<img class="mr-flag-img" src="${src}" alt="">` : `<span class="mr-flag-emoji">${info?.flag || '🏳️'}</span>`;
  };

  // événements groupés : 1 chip = icône + minute + nom, ligne par camp
  const evChips = (side) => {
    const fmt = (n) => {
      const mn = (n.match(/^(\d+'(?:\+\d+')?)/) || [])[1] || '';
      const nm = n.replace(/^\d+'(?:\+\d+')?\s*/, '');
      return `<span class="ms-min">${mn}</span><span class="ms-who">${nm}</span>`;
    };
    const rows = [
      ...(sc[side] || []).map(n => `<div class="ms-ev ms-ev-goal">⚽ ${fmt(n)}</div>`),
      ...(det.yellows?.[side] || []).map(n => `<div class="ms-ev">🟨 ${fmt(n)}</div>`),
      ...(det.reds?.[side] || []).map(n => `<div class="ms-ev">🟥 ${fmt(n)}</div>`),
    ];
    return rows.join('');
  };
  const hasEvents = (sc.home?.length || sc.away?.length || det.yellows?.home?.length ||
    det.yellows?.away?.length || det.reds?.home?.length || det.reds?.away?.length);

  const html = `
    <div class="ms-wrap">
      <div class="mr-card ms-hero-card">
        <div class="mr-team">${flagEl(hInfo)}<span class="mr-name">${m.h}</span></div>
        <div class="mr-mid"><div class="mr-score">${scoreDisp}</div><div class="mr-status">${score && score !== '–' ? 'Terminé' : m.t}</div></div>
        <div class="mr-team">${flagEl(aInfo)}<span class="mr-name">${m.a}</span></div>
      </div>
      <div class="ms-meta">${m.d} · ${m.t} · ${m.v}</div>
      ${hasEvents ? `
      <div class="ms-section">
        <div class="ms-section-title">Faits du match</div>
        <div class="ms-events">
          <div class="ms-ev-col">${evChips('home') || '<div class="ms-ev ms-ev-none">—</div>'}</div>
          <div class="ms-ev-sep"></div>
          <div class="ms-ev-col ms-ev-away">${evChips('away') || '<div class="ms-ev ms-ev-none">—</div>'}</div>
        </div>
      </div>` : ''}
      <div class="ms-section ms-stats" id="ms-stats">
        <div class="ms-loading">Chargement des statistiques…</div>
      </div>
    </div>`;

  openPanel(html, `${hInfo?.flag || ''} ${m.h} – ${m.a} ${aInfo?.flag || ''}`);
  _fillMatchStats(key);
}

async function _fillMatchStats(key) {
  const box = document.getElementById('ms-stats');
  if (!box) return;
  const eventId = state.liveInfo[key]?.eventId;
  if (!eventId) { box.innerHTML = '<div class="ms-loading">Statistiques non disponibles</div>'; return; }
  try {
    const res = await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/summary?event=${eventId}`,
      { signal: AbortSignal.timeout(10000) });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const d = await res.json();
    const teams = d.boxscore?.teams || [];
    const home = teams.find(t => t.homeAway === 'home') || teams[0];
    const away = teams.find(t => t.homeAway === 'away') || teams[1];
    if (!home || !away) throw new Error('no boxscore');

    const WANT = [
      ['possessionPct',  'Possession',     '%'],
      ['totalShots',     'Tirs',           ''],
      ['shotsOnTarget',  'Tirs cadrés',    ''],
      ['totalPasses',    'Passes',         ''],
      ['accuratePasses', 'Passes réussies',''],
      ['wonCorners',     'Corners',        ''],
      ['foulsCommitted', 'Fautes',         ''],
      ['offsides',       'Hors-jeu',       ''],
      ['saves',          'Arrêts',         ''],
      ['yellowCards',    'Cartons jaunes', ''],
      ['redCards',       'Cartons rouges', ''],
    ];
    const val = (t, name) => t.statistics?.find(s => s.name === name)?.displayValue ?? '–';

    // header : titre à gauche, bouton vidéo à droite (1h après la fin)
    const _kp = key.split('_');
    const _g = GROUPS.find(x => x.id === _kp[0]);
    const _m = _g?.matches[parseInt(_kp[1])];
    const videoBtn = (_m && isMatchVideoReady(_m))
      ? `<a class="ms-video-btn" href="${getMatchVideoUrl(key, _m)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">
           <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg> Vidéo
         </a>`
      : '';

    box.innerHTML = `
      <div class="ms-stats-head">
        <div class="ms-section-title ms-section-title-plain">Statistiques</div>
        ${videoBtn}
      </div>
      ${WANT.map(([name, label, suffix]) => {
        const hv = val(home, name), av = val(away, name);
        const hn = parseFloat(hv) || 0, an = parseFloat(av) || 0;
        const tot = hn + an || 1;
        const hWin = hn > an, aWin = an > hn;
        return `
        <div class="ms-stat-row">
          <span class="ms-sv ${hWin ? 'ms-sv-win' : ''}">${hv}${suffix}</span>
          <div class="ms-stat-mid">
            <div class="ms-stat-label">${label}</div>
            <div class="ms-stat-bar">
              <div class="ms-bar-h" style="width:${Math.round(hn / tot * 100)}%"></div>
              <div class="ms-bar-a" style="width:${Math.round(an / tot * 100)}%"></div>
            </div>
          </div>
          <span class="ms-sv ${aWin ? 'ms-sv-win' : ''}">${av}${suffix}</span>
        </div>`;
      }).join('')}`;
  } catch (e) {
    console.warn('[STATS]', e.message);
    box.innerHTML = '<div class="ms-loading">Statistiques non disponibles</div>';
  }
}

function startLivePolling() {
  // Backfill : les matchs passés sortent du scoreboard du jour — on récupère
  // tout l'historique depuis l'ouverture (11 juin) au premier chargement.
  const now = new Date();
  const ymd = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  fetchLiveScores('20260611-' + ymd);
  setInterval(() => fetchLiveScores(), LIVE_POLL_INTERVAL);
}

// ── HELPERS ───────────────────────────────────────────────────────────
function posClass(pos) {
  if (pos === 'Gardien') return 'pos-gk';
  if (pos === 'Défenseur') return 'pos-def';
  if (pos === 'Milieu') return 'pos-mid';
  return 'pos-att';
}

function posShort(pos) {
  if (pos === 'Gardien') return 'GK';
  if (pos === 'Défenseur') return 'DEF';
  if (pos === 'Milieu') return 'MID';
  return 'ATT';
}

function getTeamData(name) {
  return TEAMS[name] || null;
}

function saveScores() {
  localStorage.setItem('wc2026_scores',       JSON.stringify(state.scores));
  localStorage.setItem('wc2026_scorers',      JSON.stringify(state.scorers));
  localStorage.setItem('wc2026_goalMeta',     JSON.stringify(state.goalMeta));
  localStorage.setItem('wc2026_matchDetails', JSON.stringify(state.matchDetails));
}

function saveMatchDetail(scoreKey, field, value) {
  if (!state.matchDetails[scoreKey]) state.matchDetails[scoreKey] = {};
  state.matchDetails[scoreKey][field] = value;
  saveScores();
  // Refresh tooltip if card visible
  const tip = document.querySelector(`.mc-tooltip[data-sk="${scoreKey}"]`);
  if (tip) buildTooltipContent(tip, scoreKey);
}

// ── GLOBAL MATCH TOOLTIP ─────────────────────────────────────────────
let _mcTip = null;
let _mcTipHide = null;

function getMatchTooltipEl() {
  if (!_mcTip) {
    _mcTip = document.createElement('div');
    _mcTip.id = 'mc-global-tooltip';
    _mcTip.className = 'mc-global-tooltip';
    document.body.appendChild(_mcTip);
    _mcTip.addEventListener('mouseenter', () => { if (_mcTipHide) clearTimeout(_mcTipHide); });
    _mcTip.addEventListener('mouseleave', () => { hideMatchTooltip(); });
  }
  return _mcTip;
}

function showMatchTooltip(cardEl, scoreKey, venue) {
  if (_mcTipHide) clearTimeout(_mcTipHide);
  const tip = getMatchTooltipEl();
  tip.dataset.sk = scoreKey;
  const d = state.matchDetails[scoreKey] || {};
  const cap = VENUE_CAPACITY[venue];
  const capStr = cap ? cap.toLocaleString('fr-FR') + ' places' : '—';
  const referee = d.referee || '';
  const temp = d.temp != null ? d.temp + '°C' : '';
  const hYellows = (d.yellows?.home || []);
  const aYellows = (d.yellows?.away || []);
  const hReds    = (d.reds?.home    || []);
  const aReds    = (d.reds?.away    || []);
  tip.innerHTML = `
    <div class="mc-tt-grid">
      <div class="mc-tt-row"><span class="mc-tt-icon">🏟️</span><span class="mc-tt-val">${capStr}</span></div>
      ${referee ? `<div class="mc-tt-row"><span class="mc-tt-icon">👤</span><span class="mc-tt-val">${referee}</span></div>` : ''}
      ${temp    ? `<div class="mc-tt-row"><span class="mc-tt-icon">🌡️</span><span class="mc-tt-val">${temp}</span></div>` : ''}
    </div>
    ${hYellows.length||aYellows.length||hReds.length||aReds.length ? `
    <div class="mc-tt-cards-section">
      <div class="mc-tt-team-cards">${hYellows.map(p=>`<span class="mc-tt-card">🟨 ${p}</span>`).join('')}${hReds.map(p=>`<span class="mc-tt-card">🟥 ${p}</span>`).join('')}</div>
      <div class="mc-tt-sep"></div>
      <div class="mc-tt-team-cards">${aYellows.map(p=>`<span class="mc-tt-card">🟨 ${p}</span>`).join('')}${aReds.map(p=>`<span class="mc-tt-card">🟥 ${p}</span>`).join('')}</div>
    </div>` : '<div class="mc-tt-no-data">Aucun carton enregistré</div>'}
    <div class="mc-tt-actions">
      <button class="mc-tt-btn" onclick="event.stopPropagation();promptMatchDetail('${scoreKey}','referee')">✏️ Arbitre</button>
      <button class="mc-tt-btn" onclick="event.stopPropagation();promptMatchDetail('${scoreKey}','temp')">🌡️ Temp</button>
      <button class="mc-tt-btn" onclick="event.stopPropagation();promptMatchDetail('${scoreKey}','yellow')">🟨 Jaune</button>
      <button class="mc-tt-btn" onclick="event.stopPropagation();promptMatchDetail('${scoreKey}','red')">🟥 Rouge</button>
    </div>`;
  // Position: above card, centered
  const rect = cardEl.getBoundingClientRect();
  tip.style.display = 'block';
  tip.style.opacity = '0';
  tip.style.transform = 'translateY(6px)';
  // measure tip width after display
  requestAnimationFrame(() => {
    const tw = tip.offsetWidth;
    const th = tip.offsetHeight;
    let left = rect.left + rect.width / 2 - tw / 2;
    let top  = rect.top - th - 10 + window.scrollY;
    // clamp horizontally
    left = Math.max(8, Math.min(left, window.innerWidth - tw - 8));
    // if too close to top, show below card
    if (rect.top - th - 10 < 70) top = rect.bottom + 10 + window.scrollY;
    tip.style.left = left + 'px';
    tip.style.top  = top  + 'px';
    tip.style.opacity = '1';
    tip.style.transform = 'translateY(0)';
  });
}

function hideMatchTooltip() {
  _mcTipHide = setTimeout(() => {
    if (_mcTip) { _mcTip.style.opacity = '0'; _mcTip.style.transform = 'translateY(6px)'; }
    setTimeout(() => { if (_mcTip) _mcTip.style.display = 'none'; }, 180);
  }, 80);
}

function buildTooltipContent(tip, scoreKey) { /* legacy no-op */ }

function promptMatchDetail(scoreKey, field) {
  if (field === 'referee') {
    const val = prompt('Nom de l\'arbitre:', state.matchDetails[scoreKey]?.referee || '');
    if (val !== null) saveMatchDetail(scoreKey, 'referee', val.trim());
  } else if (field === 'temp') {
    const val = prompt('Température (ex: 28):', state.matchDetails[scoreKey]?.temp || '');
    if (val !== null && !isNaN(parseInt(val))) saveMatchDetail(scoreKey, 'temp', parseInt(val));
  } else if (field === 'yellow' || field === 'red') {
    const teamSide = prompt('Équipe (home/away):', 'home');
    if (!teamSide) return;
    const player = prompt('Joueur (ex: Mbappé 23\'):', '');
    if (!player) return;
    const d = state.matchDetails[scoreKey] || {};
    const key = field === 'yellow' ? 'yellows' : 'reds';
    if (!d[key]) d[key] = { home: [], away: [] };
    d[key][teamSide === 'home' ? 'home' : 'away'].push(player.trim());
    if (!state.matchDetails[scoreKey]) state.matchDetails[scoreKey] = {};
    state.matchDetails[scoreKey][key] = d[key];
    saveScores();
    const tip = document.querySelector(`.mc-tooltip[data-sk="${scoreKey}"]`);
    if (tip) buildTooltipContent(tip, scoreKey);
  }
}

// ── LIVE DETECTION ────────────────────────────────────────────────────
const MONTHS_FR = {'Janvier':0,'Février':1,'Mars':2,'Avril':3,'Mai':4,'Juin':5,'Juillet':6,'Août':7,'Septembre':8,'Octobre':9,'Novembre':10,'Décembre':11};

let _SK_BY_PAIR = null;
function scoreKeyForMatch(m) {
  if (!_SK_BY_PAIR) {
    _SK_BY_PAIR = {};
    GROUPS.forEach(g => g.matches.forEach((mm, i) => { _SK_BY_PAIR[mm.h + '|' + mm.a] = g.id + '_' + i; }));
  }
  return _SK_BY_PAIR[m.h + '|' + m.a] || null;
}

function matchLiveStatus(m) {
  // 1) Statut temps réel de l'API si dispo (fiable, gère prolongations/retards)
  const sk = scoreKeyForMatch(m);
  const li = sk && state.liveInfo[sk];
  if (li && li.state) {
    if (li.state === 'in')   return 'live';
    if (li.state === 'post') return 'finished';
    if (li.state === 'pre')  return 'upcoming';
  }
  // 2) Sinon, horaire réel UTC du match
  let start;
  if (m.utc) {
    start = new Date(m.utc);
  } else {
    const parts = m.d.split(' ');
    const day = parseInt(parts[0]);
    const month = MONTHS_FR[parts[1]] ?? 5;
    const [h, min] = m.t.split(':').map(Number);
    start = new Date(2026, month, day, h, min, 0);
  }
  const end = new Date(start.getTime() + 110 * 60 * 1000);
  const now = new Date();
  if (now >= start && now <= end) return 'live';
  if (now > end) return 'finished';
  return 'upcoming';
}

// ── WC GOALS (career World Cup goals per player ID) ───────────────────
const WC_GOALS = {
  // France
  'fr24':12, 'fr25':5, 'fr26':2, 'fr17':4, 'fr18':3, 'fr15':1, 'fr28':3, 'fr27':1,
  // Espagne
  'es9':3, 'es10':2, 'es11':4, 'es12':2, 'es6':1, 'es8':1,
  // Argentine
  'ar9':13, 'ar10':4, 'ar11':6, 'ar8':3, 'ar7':2, 'ar6':2,
  // Brésil
  'br7':6, 'br8':3, 'br9':3, 'br10':1, 'br3':1,
  // Portugal
  'por1':8, 'por2':1, 'por3':3, 'por7':2,
  // Angleterre
  'eng9':6, 'eng10':2, 'eng1':1, 'eng7':1,
  // Allemagne
  'ger1':5, 'ger9':2, 'ger10':3, 'ger7':2, 'ger8':3,
  // Uruguay
  'uru4':5, 'uru6':3, 'uru7':2,
  // Mexique
  'mx12':4, 'mx5':3, 'mx7':2, 'mx9':2,
  // Pays-Bas
  'nl10':5, 'nl11':2, 'nl9':3,
  // Maroc
  'ma9':2, 'ma10':2,
  // Croatie
  'cro9':2, 'cro6':1, 'cro7':2,
  // Colombie
  'col6':5, 'col7':3, 'col8':2,
  // Sénégal
  'sen6':2, 'sen7':1,
  // Égypte
  'egy8':1,
  // Japon
  'jp8':2, 'jp9':1,
};

// ── WORLD CUP HISTORICAL DATA ─────────────────────────────────────────
const WC_HISTORY = {
  editions: 22,
  totalGoals: 2548,
  totalNations: 79,
  totalMatches: 964,

  // All-time top scorers
  allTimeScorers: [
    { name: 'Miroslav Klose',     nation: 'Allemagne', flag: '🇩🇪', goals: 16, editions: '2002–2014', img: null },
    { name: 'Ronaldo',            nation: 'Brésil',    flag: '🇧🇷', goals: 15, editions: '1994–2006', img: null },
    { name: 'Gerd Müller',        nation: 'Allemagne', flag: '🇩🇪', goals: 14, editions: '1970–1974', img: null },
    { name: 'Just Fontaine',      nation: 'France',    flag: '🇫🇷', goals: 13, editions: '1958',      img: null },
    { name: 'Pelé',               nation: 'Brésil',    flag: '🇧🇷', goals: 12, editions: '1958–1970', img: null },
    { name: 'Sandor Kocsis',      nation: 'Hongrie',   flag: '🇭🇺', goals: 11, editions: '1954',      img: null },
    { name: 'Jürgen Klinsmann',   nation: 'Allemagne', flag: '🇩🇪', goals: 11, editions: '1990–1998', img: null },
    { name: 'Gabriel Batistuta',  nation: 'Argentine', flag: '🇦🇷', goals: 10, editions: '1994–2002', img: null },
    { name: 'Gary Lineker',       nation: 'Angleterre',flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', goals: 10, editions: '1986–1990', img: null },
    { name: 'Teofilo Cubillas',   nation: 'Pérou',     flag: '🇵🇪', goals: 10, editions: '1970–1978', img: null },
    { name: 'Grzegorz Lato',      nation: 'Pologne',   flag: '🇵🇱', goals: 10, editions: '1974–1982', img: null },
    { name: 'Helmut Rahn',        nation: 'Allemagne', flag: '🇩🇪', goals: 10, editions: '1954–1958', img: null },
    { name: 'Kylian Mbappé',      nation: 'France',    flag: '🇫🇷', goals: 12, editions: '2018–2022', img: 'images/players/345024.webp' },
    { name: 'Lionel Messi',       nation: 'Argentine', flag: '🇦🇷', goals: 13, editions: '2006–2022', img: 'images/players/41743.webp' },
    { name: 'Cristiano Ronaldo',  nation: 'Portugal',  flag: '🇵🇹', goals: 8,  editions: '2006–2022', img: 'images/players/30893.webp' },
  ],

  // Titles by nation
  palmares: [
    { nation: 'Brésil',    flag: '🇧🇷', titles: 5, years: '1958 · 1962 · 1970 · 1994 · 2002', color: '#22c55e' },
    { nation: 'Allemagne', flag: '🇩🇪', titles: 4, years: '1954 · 1974 · 1990 · 2014',         color: '#64748b' },
    { nation: 'Italie',    flag: '🇮🇹', titles: 4, years: '1934 · 1938 · 1982 · 2006',         color: '#3b82f6' },
    { nation: 'Argentine', flag: '🇦🇷', titles: 3, years: '1978 · 1986 · 2022',                color: '#38bdf8' },
    { nation: 'France',    flag: '🇫🇷', titles: 2, years: '1998 · 2018',                       color: '#6366f1' },
    { nation: 'Uruguay',   flag: '🇺🇾', titles: 2, years: '1930 · 1950',                       color: '#14b8a6' },
    { nation: 'Angleterre',flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', titles: 1, years: '1966',                             color: '#f43f5e' },
    { nation: 'Espagne',   flag: '🇪🇸', titles: 1, years: '2010',                              color: '#f59e0b' },
  ],

  // Golden Ball winners (recent)
  goldenBall: [
    { year: 1990, name: 'Salvatore Schillaci', nation: 'Italie',    flag: '🇮🇹' },
    { year: 1994, name: 'Romário',             nation: 'Brésil',    flag: '🇧🇷' },
    { year: 1998, name: 'Ronaldo',             nation: 'Brésil',    flag: '🇧🇷' },
    { year: 2002, name: 'Oliver Kahn',         nation: 'Allemagne', flag: '🇩🇪' },
    { year: 2006, name: 'Zinédine Zidane',     nation: 'France',    flag: '🇫🇷' },
    { year: 2010, name: 'Diego Forlán',        nation: 'Uruguay',   flag: '🇺🇾' },
    { year: 2014, name: 'Lionel Messi',        nation: 'Argentine', flag: '🇦🇷' },
    { year: 2018, name: 'Luka Modrić',         nation: 'Croatie',   flag: '🇭🇷' },
    { year: 2022, name: 'Lionel Messi',        nation: 'Argentine', flag: '🇦🇷' },
  ],

  // Golden Boot (recent)
  goldenBoot: [
    { year: 2006, name: 'Miroslav Klose',    nation: 'Allemagne', flag: '🇩🇪', goals: 5 },
    { year: 2010, name: 'Thomas Müller',     nation: 'Allemagne', flag: '🇩🇪', goals: 5 },
    { year: 2014, name: 'James Rodríguez',   nation: 'Colombie',  flag: '🇨🇴', goals: 6 },
    { year: 2018, name: 'Harry Kane',        nation: 'Angleterre',flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', goals: 6 },
    { year: 2022, name: 'Kylian Mbappé',     nation: 'France',    flag: '🇫🇷', goals: 8 },
  ],

  // WC records
  records: [
    { label: 'Plus de buts (édition)', value: '27', detail: 'Just Fontaine — 1958', icon: '⚽' },
    { label: 'Plus de victoires', value: '76', detail: 'Brésil (22 éditions)',       icon: '🏆' },
    { label: 'Plus de matchs joués', value: '29', detail: 'Lothar Matthäus (ALL)',   icon: '👟' },
    { label: 'Plus jeune buteur', value: '17 ans', detail: 'Pelé — 1958',            icon: '⚡' },
    { label: 'Plus grand écart', value: '10-1', detail: 'Hongrie vs El Salvador 1982', icon: '📊' },
    { label: 'Finale la plus ancienne', value: '1930', detail: 'Uruguay 4-2 Argentine', icon: '📅' },
  ],

  // All-time top assisters at World Cup (estimated — tracking pre-1966 unofficial)
  allTimePasseurs: [
    { name: 'Pelé',              nation: 'Brésil',    flag: '🇧🇷', assists: 10, editions: '1958–1970' },
    { name: 'Diego Maradona',    nation: 'Argentine', flag: '🇦🇷', assists: 8,  editions: '1982–1994' },
    { name: 'Lionel Messi',      nation: 'Argentine', flag: '🇦🇷', assists: 8,  editions: '2006–2022', img: 'images/players/41743.webp' },
    { name: 'Miroslav Klose',    nation: 'Allemagne', flag: '🇩🇪', assists: 7,  editions: '2002–2014' },
    { name: 'Lothar Matthäus',   nation: 'Allemagne', flag: '🇩🇪', assists: 6,  editions: '1982–1998' },
    { name: 'Neymar',            nation: 'Brésil',    flag: '🇧🇷', assists: 5,  editions: '2014–2022' },
    { name: 'Thomas Müller',     nation: 'Allemagne', flag: '🇩🇪', assists: 5,  editions: '2010–2018' },
    { name: 'Kylian Mbappé',     nation: 'France',    flag: '🇫🇷', assists: 5,  editions: '2018–2022', img: 'images/players/345024.webp' },
    { name: 'Ronaldo R9',        nation: 'Brésil',    flag: '🇧🇷', assists: 5,  editions: '1994–2006' },
    { name: 'Xavi Hernández',    nation: 'Espagne',   flag: '🇪🇸', assists: 5,  editions: '2002–2014' },
    { name: 'Zinédine Zidane',   nation: 'France',    flag: '🇫🇷', assists: 4,  editions: '1998–2006' },
    { name: 'Luka Modrić',       nation: 'Croatie',   flag: '🇭🇷', assists: 4,  editions: '2006–2022' },
  ],
};

// ── WC HISTORICAL TEAM STATS ────────────────────────────────────────
const WC_TEAM_STATS = {
  // Europe
  'France':             { apps:16, J:66,  V:36, N:11, D:19, BP:136, BC:76,  titles:2, best:'Champion',  bestY:'1998 · 2018',       top:'J. Fontaine', topG:13 },
  'Allemagne':          { apps:20, J:109, V:67, N:21, D:21, BP:226, BC:125, titles:4, best:'Champion',  bestY:'1954·74·90·2014',    top:'M. Klose',    topG:16 },
  'Espagne':            { apps:16, J:67,  V:36, N:14, D:17, BP:128, BC:78,  titles:1, best:'Champion',  bestY:'2010',               top:'D. Villa',    topG:9  },
  'Angleterre':         { apps:16, J:69,  V:37, N:20, D:12, BP:128, BC:64,  titles:1, best:'Champion',  bestY:'1966',               top:'G. Lineker',  topG:10 },
  'Portugal':           { apps:9,  J:42,  V:24, N:6,  D:12, BP:74,  BC:51,  titles:0, best:'3e place',  bestY:'1966 · 2006',        top:'Eusébio',     topG:9  },
  'Pays-Bas':           { apps:11, J:52,  V:30, N:10, D:12, BP:95,  BC:59,  titles:0, best:'Finaliste', bestY:'1974 · 78 · 2010',   top:'A. Robben',   topG:6  },
  'Belgique':           { apps:14, J:49,  V:24, N:10, D:15, BP:93,  BC:70,  titles:0, best:'4e place',  bestY:'1986',               top:'R. Lukaku',   topG:6  },
  'Croatie':            { apps:6,  J:30,  V:13, N:8,  D:9,  BP:42,  BC:32,  titles:0, best:'Finaliste', bestY:'2018',               top:'D. Šuker',    topG:6  },
  'Suède':              { apps:13, J:52,  V:27, N:8,  D:17, BP:105, BC:83,  titles:0, best:'Finaliste', bestY:'1958',               top:'M. Dahlin',   topG:6  },
  'Suisse':             { apps:13, J:40,  V:17, N:8,  D:15, BP:62,  BC:67,  titles:0, best:'QF',        bestY:'1934 · 38 · 54',     top:'X. Shaqiri',  topG:4  },
  'Écosse':             { apps:8,  J:23,  V:4,  N:7,  D:12, BP:25,  BC:41,  titles:0, best:'1er tour',  bestY:'8 participations',   top:'J. Jordan',   topG:4  },
  'Norvège':            { apps:3,  J:8,   V:2,  N:2,  D:4,  BP:9,   BC:13,  titles:0, best:'Huitième',  bestY:'1994 · 1998',        top:'T.A. Flo',    topG:2  },
  'Rép. tchèque':       { apps:1,  J:3,   V:0,  N:1,  D:2,  BP:3,   BC:5,   titles:0, best:'1er tour',  bestY:'2006',               top:'—',           topG:0  },
  'Bosnie-Herzégovine': { apps:1,  J:3,   V:1,  N:0,  D:2,  BP:4,   BC:4,   titles:0, best:'1er tour',  bestY:'2014',               top:'E. Džeko',    topG:3  },
  'Turquie':            { apps:2,  J:10,  V:6,  N:1,  D:3,  BP:20,  BC:17,  titles:0, best:'3e place',  bestY:'2002',               top:'H. Şükür',    topG:5  },
  'Autriche':           { apps:7,  J:29,  V:17, N:3,  D:9,  BP:43,  BC:47,  titles:0, best:'3e place',  bestY:'1934 · 1954',        top:'E. Probst',   topG:6  },
  // South America
  'Brésil':             { apps:22, J:114, V:76, N:18, D:20, BP:237, BC:105, titles:5, best:'Champion',  bestY:'58·62·70·94·2002',   top:'Ronaldo',     topG:15 },
  'Argentine':          { apps:18, J:88,  V:47, N:16, D:25, BP:145, BC:108, titles:3, best:'Champion',  bestY:'1978 · 86 · 2022',   top:'L. Messi',    topG:13 },
  'Uruguay':            { apps:14, J:56,  V:28, N:10, D:18, BP:90,  BC:72,  titles:2, best:'Champion',  bestY:'1930 · 1950',        top:'L. Suárez',   topG:7  },
  'Paraguay':           { apps:8,  J:28,  V:9,  N:10, D:9,  BP:31,  BC:35,  titles:0, best:'QF',        bestY:'2010',               top:'J. Romero',   topG:3  },
  'Équateur':           { apps:3,  J:10,  V:4,  N:1,  D:5,  BP:9,   BC:13,  titles:0, best:'Huitième',  bestY:'2006 · 2022',        top:'A. Delgado',  topG:3  },
  'Colombie':           { apps:6,  J:22,  V:10, N:3,  D:9,  BP:31,  BC:28,  titles:0, best:'QF',        bestY:'2014',               top:'J. Rodríguez',topG:6  },
  // North/Central America & Caribbean
  'États-Unis':         { apps:11, J:36,  V:12, N:7,  D:17, BP:53,  BC:76,  titles:0, best:'3e place',  bestY:'1930',               top:'L. Donovan',  topG:5  },
  'Mexique':            { apps:17, J:59,  V:16, N:14, D:29, BP:69,  BC:103, titles:0, best:'QF',        bestY:'1970 · 1986',        top:'J. Hernández',topG:4  },
  'Canada':             { apps:2,  J:6,   V:1,  N:0,  D:5,  BP:4,   BC:12,  titles:0, best:'1er tour',  bestY:'1986 · 2022',        top:'A. Davies',   topG:1  },
  'Haïti':              { apps:1,  J:3,   V:0,  N:0,  D:3,  BP:2,   BC:14,  titles:0, best:'1er tour',  bestY:'1974',               top:'E. Sanon',    topG:2  },
  'Curaçao':            { apps:0,  J:0,   V:0,  N:0,  D:0,  BP:0,   BC:0,   titles:0, best:'—',         bestY:'1re participation',   top:'—',           topG:0  },
  'Panamá':             { apps:1,  J:3,   V:0,  N:0,  D:3,  BP:2,   BC:11,  titles:0, best:'1er tour',  bestY:'2018',               top:'F. Baloy',    topG:1  },
  // Africa
  'Maroc':              { apps:6,  J:20,  V:7,  N:5,  D:8,  BP:24,  BC:26,  titles:0, best:'4e place',  bestY:'2022',               top:'Y. En-Nesyri',topG:5  },
  'Sénégal':            { apps:3,  J:12,  V:3,  N:3,  D:6,  BP:12,  BC:12,  titles:0, best:'QF',        bestY:'2002',               top:'P.B. Diop',   topG:2  },
  'Égypte':             { apps:3,  J:7,   V:1,  N:2,  D:4,  BP:5,   BC:10,  titles:0, best:'1er tour',  bestY:'1934 · 90 · 2018',   top:'Mo Salah',    topG:1  },
  'Tunisie':            { apps:6,  J:20,  V:5,  N:5,  D:10, BP:19,  BC:36,  titles:0, best:'1er tour',  bestY:'1978',               top:'W. Khazri',   topG:3  },
  "Côte d'Ivoire":      { apps:3,  J:9,   V:3,  N:1,  D:5,  BP:11,  BC:13,  titles:0, best:'1er tour',  bestY:'2006 · 10 · 14',     top:'D. Drogba',   topG:3  },
  'Algérie':            { apps:4,  J:13,  V:3,  N:3,  D:7,  BP:13,  BC:18,  titles:0, best:'Huitième',  bestY:'2014',               top:'R. Madjer',   topG:3  },
  'Ghana':              { apps:3,  J:12,  V:4,  N:3,  D:5,  BP:13,  BC:16,  titles:0, best:'QF',        bestY:'2010',               top:'A. Gyan',     topG:6  },
  'Afrique du Sud':     { apps:3,  J:9,   V:2,  N:3,  D:4,  BP:10,  BC:16,  titles:0, best:'1er tour',  bestY:'1998 · 2002 · 2010', top:'B. McCarthy', topG:2  },
  'RD Congo':           { apps:1,  J:3,   V:0,  N:0,  D:3,  BP:0,   BC:14,  titles:0, best:'1er tour',  bestY:'1974',               top:'—',           topG:0  },
  // Asia
  'Corée du Sud':       { apps:11, J:40,  V:11, N:7,  D:22, BP:58,  BC:77,  titles:0, best:'4e place',  bestY:'2002',               top:'C. Bum-kun',  topG:5  },
  'Japon':              { apps:7,  J:24,  V:9,  N:4,  D:11, BP:28,  BC:40,  titles:0, best:'Huitième',  bestY:'2002·10·18·22',      top:'K. Honda',    topG:4  },
  'Iran':               { apps:6,  J:18,  V:4,  N:3,  D:11, BP:13,  BC:30,  titles:0, best:'1er tour',  bestY:'1978',               top:'M. Taremi',   topG:3  },
  'Arabie saoudite':    { apps:6,  J:19,  V:5,  N:1,  D:13, BP:19,  BC:42,  titles:0, best:'Huitième',  bestY:'1994',               top:'S. Al-Jaber', topG:4  },
  'Qatar':              { apps:1,  J:3,   V:0,  N:0,  D:3,  BP:1,   BC:7,   titles:0, best:'1er tour',  bestY:'2022',               top:'M. Muntari',  topG:1  },
  'Irak':               { apps:1,  J:3,   V:0,  N:1,  D:2,  BP:2,   BC:4,   titles:0, best:'1er tour',  bestY:'1986',               top:'A. Radhi',    topG:2  },
  'Ouzbékistan':        { apps:0,  J:0,   V:0,  N:0,  D:0,  BP:0,   BC:0,   titles:0, best:'—',         bestY:'1re participation',   top:'—',           topG:0  },
  'Jordanie':           { apps:0,  J:0,   V:0,  N:0,  D:0,  BP:0,   BC:0,   titles:0, best:'—',         bestY:'1re participation',   top:'—',           topG:0  },
  // Oceania
  'Australie':          { apps:5,  J:17,  V:5,  N:3,  D:9,  BP:28,  BC:40,  titles:0, best:'Huitième',  bestY:'2006 · 2022',        top:'T. Cahill',   topG:5  },
  'Nouvelle-Zélande':   { apps:2,  J:6,   V:0,  N:3,  D:3,  BP:4,   BC:14,  titles:0, best:'1er tour',  bestY:'1982 · 2010',        top:'W. Reid',     topG:1  },
  'Cap-Vert':           { apps:0,  J:0,   V:0,  N:0,  D:0,  BP:0,   BC:0,   titles:0, best:'—',         bestY:'1re participation',   top:'—',           topG:0  },
};

// ── NAVIGATION ────────────────────────────────────────────────────────
function switchView(viewName) {
  state.view = viewName;
  window.scrollTo({ top: 0, behavior: 'instant' });
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const viewEl = document.getElementById('view-' + viewName);
  if (viewEl) viewEl.classList.add('active');
  document.querySelectorAll('[data-view="' + viewName + '"]').forEach(el => el.classList.add('active'));
  closePanel();
  if (viewName === 'groups') renderGroups();
  if (viewName === 'calendar') renderCalendar();
  if (viewName === 'stats') renderStats();
  if (viewName === 'stadiums') renderStadiums();
  if (viewName === 'comparison') renderComparison();
  if (viewName === 'custom-squad') renderCustomSquad();
  if (viewName === 'knockout') renderKnockout();
  if (viewName === 'live') renderLiveView();
  if (viewName === 'pronostics' && typeof renderPronostics === 'function') renderPronostics();
}

// ── SIDE PANEL ────────────────────────────────────────────────────────
function openPanel(html, title) {
  const panel = document.getElementById('side-panel');
  const drawer = document.getElementById('panel-drawer');
  const titleEl = document.getElementById('panel-title');
  const bodyEl = document.getElementById('panel-body');
  if (titleEl) titleEl.textContent = title || '';
  if (bodyEl) bodyEl.innerHTML = html;
  // Reset body flip transform from player panel animation
  if (bodyEl) { bodyEl.style.transition = 'none'; bodyEl.style.transform = ''; bodyEl.style.opacity = ''; }
  // Remove group-mode class (restored per panel type)
  if (drawer) drawer.classList.remove('gp-mode');
  panel.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (drawer) _initPanelSwipe(drawer);
}

// Mobile : tirer la poignée (ou le haut du panneau) vers le bas pour fermer
function _initPanelSwipe(drawer) {
  if (!window.matchMedia('(max-width: 768px)').matches) return;
  const grabber = document.getElementById('panel-grabber');
  const body = document.getElementById('panel-body');
  if (!grabber) return;
  let startY = 0, dragging = false, moved = 0;

  const onStart = (e) => {
    // depuis le haut : poignée/header toujours ; corps seulement si scroll en haut
    const fromTop = e.target.closest('.panel-grabber, .panel-header');
    if (!fromTop && (!body || body.scrollTop > 2)) return;
    startY = e.touches[0].clientY; dragging = true; moved = 0;
    drawer.style.transition = 'none';
  };
  const onMove = (e) => {
    if (!dragging) return;
    moved = e.touches[0].clientY - startY;
    if (moved < 0) moved = 0;
    if (moved > 0) { drawer.style.transform = `translateY(${moved}px)`; }
  };
  const onEnd = () => {
    if (!dragging) return;
    dragging = false;
    drawer.style.transition = '';
    drawer.style.transform = '';
    if (moved > 110) closePanel();
  };

  drawer.ontouchstart = onStart;
  drawer.ontouchmove = onMove;
  drawer.ontouchend = onEnd;
}

function closePanel() {
  const panel = document.getElementById('side-panel');
  const drawer = document.getElementById('panel-drawer');
  if (drawer) { drawer.style.transform = ''; drawer.style.transition = ''; }
  if (panel) panel.classList.remove('open');
  document.body.style.overflow = '';
  state.panelStack = [];
}

// ── RENDER GROUPS ─────────────────────────────────────────────────────
function renderGroups() {
  const container = document.getElementById('groups-grid');
  if (!container) {
    document.body.insertAdjacentHTML('afterbegin', '<div style="position:fixed;top:0;left:0;background:red;color:white;z-index:9999;padding:20px;font-size:20px">groups-grid INTROUVABLE</div>');
    return;
  }
  try {

    if (!GROUPS || GROUPS.length === 0) {
      container.innerHTML = '<p style="color:red;padding:20px">ERREUR: GROUPS est vide ou undefined</p>';
      return;
    }
    container.innerHTML = GROUPS.map(g => {
      const standings = getGroupStandings(g.id);
      return `
      <div class="group-card" onclick="openGroupPanel('${g.id}')">
        <div class="group-card-header">
          <div class="group-letter">Groupe ${g.id}</div>
          <div class="group-match-count">${g.matches.length} Matchs</div>
        </div>
        <div class="group-standings-table">
          <div class="gs-row gs-header">
            <span class="gs-team">Équipe</span>
            <span class="gs-stat">MJ</span>
            <span class="gs-stat">Diff</span>
            <span class="gs-stat gs-pts">Pts</span>
          </div>
          ${standings.map((t, idx) => `
            <div class="gs-row ${idx < 2 ? 'gs-qualify' : ''}" onclick="event.stopPropagation(); openTeamPanel('${t.name}')">
              <span class="gs-team">
                <span class="gs-rank">${idx + 1}</span>
                <span class="gs-flag">${t.flag}</span>
                ${t.name}
              </span>
              <span class="gs-stat">${t.mp}</span>
              <span class="gs-stat ${t.gd > 0 ? 'pos' : t.gd < 0 ? 'neg' : ''}">${t.gd > 0 ? '+' : ''}${t.gd}</span>
              <span class="gs-stat gs-pts">${t.pts}</span>
            </div>
          `).join('')}
        </div>
      </div>`;
    }).join('');
    requestAnimationFrame(() => {
      container.querySelectorAll('.group-card').forEach(c => c.classList.add('visible'));
    });
  } catch(e) {
    container.innerHTML = '<div style="color:red;background:#111;padding:30px;font-size:18px;font-family:monospace">ERREUR RENDERGROUPS:<br>' + e.message + '<br><br>' + e.stack + '</div>';
  }
}

// ── PITCH LAYOUT HELPERS ──────────────────────────────────────────────
function getPitchColor(pos) {
  if (pos === 'Gardien') return '#d97706';
  if (pos === 'Défenseur') return '#2563eb';
  if (pos === 'Milieu') return '#7c3aed';
  return '#dc2626';
}

// Given starters array, return [{player, left%, top%}] from bottom to top
// GK at bottom, DEF, MID, ATT at top
function balancedOutfield(defs, mids, atts) {
  // Always ensure all 3 lines are represented. Max 4 DEF, 3 ATT, rest MID.
  const defTake = Math.min(defs.length, 4);
  const attTake = Math.min(atts.length, 3);
  const midTake = Math.min(mids.length, 10 - defTake - attTake);
  const defsF = defs.slice(0, defTake);
  const attsF = atts.slice(0, attTake);
  const midsF = mids.slice(0, midTake);
  // Fill remaining slots if some positions were empty
  const taken = defsF.length + midsF.length + attsF.length;
  if (taken < 10) {
    const extra = 10 - taken;
    const extraDef = defs.slice(defsF.length, defsF.length + Math.ceil(extra / 2));
    const extraMid = mids.slice(midsF.length, midsF.length + Math.floor(extra / 2));
    return { defsF: [...defsF, ...extraDef], midsF: [...midsF, ...extraMid], attsF };
  }
  return { defsF, midsF, attsF };
}

function computePitchPositions(starters) {
  const gk   = starters.filter(p => (p.pos||'').startsWith('Gardien')).slice(0, 1);
  const defs = starters.filter(p => (p.pos||'').startsWith('Défenseur'));
  const mids = starters.filter(p => (p.pos||'').startsWith('Milieu'));
  const atts = starters.filter(p => (p.pos||'').startsWith('Attaquant'));
  const { defsF, midsF, attsF } = balancedOutfield(defs, mids, atts);
  const positions = [];
  // GK  : deep in goal (bottom)
  if (gk[0]) positions.push({ player: gk[0], left: 50, top: 96 });
  // DEF : in front of penalty area
  const defSpacing = defsF.length > 0 ? 76 / (defsF.length + 1) : 0;
  defsF.forEach((p, i) => positions.push({ player: p, left: defSpacing * (i + 1) + 12, top: 82 }));
  // MID : midfield (bottom half)
  const midSpacing = midsF.length > 0 ? 76 / (midsF.length + 1) : 0;
  midsF.forEach((p, i) => positions.push({ player: p, left: midSpacing * (i + 1) + 12, top: 70 }));
  // ATT : near center circle, bottom half
  const attSpacing = attsF.length > 0 ? 76 / (attsF.length + 1) : 0;
  attsF.forEach((p, i) => positions.push({ player: p, left: attSpacing * (i + 1) + 12, top: 58 }));
  return positions;
}

// Mirror vertically (for home team displayed at top of match pitch)
function computePitchPositionsMirrored(starters) {
  return computePitchPositions(starters).map(p => ({ ...p, top: 100 - p.top }));
}

// Compute positions confined to a single half (for match view)
function computeHalfPitchPositions(starters, isTopHalf) {
  const gk   = starters.filter(p => (p.pos||'').startsWith('Gardien')).slice(0, 1);
  const defs = starters.filter(p => (p.pos||'').startsWith('Défenseur'));
  const mids = starters.filter(p => (p.pos||'').startsWith('Milieu'));
  const atts = starters.filter(p => (p.pos||'').startsWith('Attaquant'));
  const { defsF, midsF, attsF } = balancedOutfield(defs, mids, atts);
  const positions = [];

  // Base positions for bottom half (away team, attacking UP)
  if (gk[0]) positions.push({ player: gk[0], left: 50, top: 93 });

  const defSpacing = defsF.length > 0 ? 68 / (defsF.length + 1) : 0;
  defsF.forEach((p, i) => positions.push({ player: p, left: defSpacing * (i + 1) + 16, top: 79 }));

  const midSpacing = midsF.length > 0 ? 68 / (midsF.length + 1) : 0;
  midsF.forEach((p, i) => positions.push({ player: p, left: midSpacing * (i + 1) + 16, top: 67 }));

  const attSpacing = attsF.length > 0 ? 68 / (attsF.length + 1) : 0;
  attsF.forEach((p, i) => positions.push({ player: p, left: attSpacing * (i + 1) + 16, top: 56 }));

  if (isTopHalf) {
    // Mirror across center (home team, top half)
    return positions.map(p => ({ ...p, top: 100 - p.top }));
  }
  return positions;
}

function renderPitchLines() {
  return `<svg viewBox="0 0 68 105" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;">
    <rect x="2" y="2" width="64" height="101" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.5"/>
    <line x1="2" y1="52.5" x2="66" y2="52.5" stroke="rgba(255,255,255,0.4)" stroke-width="0.5"/>
    <circle cx="34" cy="52.5" r="9.15" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.5"/>
    <circle cx="34" cy="52.5" r="0.5" fill="rgba(255,255,255,0.5)"/>
    <rect x="13.84" y="2" width="40.32" height="16.5" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
    <rect x="24.84" y="2" width="18.32" height="5.5" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
    <rect x="29.3" y="0.5" width="9.4" height="2" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.5"/>
    <circle cx="34" cy="13" r="0.5" fill="rgba(255,255,255,0.4)"/>
    <rect x="13.84" y="86.5" width="40.32" height="16.5" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
    <rect x="24.84" y="97" width="18.32" height="5.5" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
    <rect x="29.3" y="102.5" width="9.4" height="2" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.5"/>
    <circle cx="34" cy="92" r="0.5" fill="rgba(255,255,255,0.4)"/>
    <path d="M 23.5 18.5 A 9.15 9.15 0 0 1 44.5 18.5" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
    <path d="M 23.5 86.5 A 9.15 9.15 0 0 0 44.5 86.5" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
    <path d="M 2 5 A 3 3 0 0 0 5 2" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="0.5"/>
    <path d="M 66 5 A 3 3 0 0 1 63 2" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="0.5"/>
    <path d="M 2 100 A 3 3 0 0 1 5 103" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="0.5"/>
    <path d="M 66 100 A 3 3 0 0 0 63 103" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="0.5"/>
  </svg>`;
}

// ── HORIZONTAL PITCH (landscape, home=left, away=right) ───────────────
function renderPitchLinesH() {
  return `<svg viewBox="0 0 105 68" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;">
    <rect x="2" y="2" width="101" height="64" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.5"/>
    <line x1="52.5" y1="2" x2="52.5" y2="66" stroke="rgba(255,255,255,0.4)" stroke-width="0.5"/>
    <circle cx="52.5" cy="34" r="9.15" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.5"/>
    <circle cx="52.5" cy="34" r="0.5" fill="rgba(255,255,255,0.5)"/>
    <rect x="2" y="13.84" width="16.5" height="40.32" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
    <rect x="2" y="24.84" width="5.5" height="18.32" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
    <rect x="0.5" y="29.3" width="2" height="9.4" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.5"/>
    <circle cx="13" cy="34" r="0.5" fill="rgba(255,255,255,0.4)"/>
    <rect x="86.5" y="13.84" width="16.5" height="40.32" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
    <rect x="97" y="24.84" width="5.5" height="18.32" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
    <rect x="102.5" y="29.3" width="2" height="9.4" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.5"/>
    <circle cx="92" cy="34" r="0.5" fill="rgba(255,255,255,0.4)"/>
    <path d="M 18.5 23.5 A 9.15 9.15 0 0 0 18.5 44.5" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
    <path d="M 86.5 23.5 A 9.15 9.15 0 0 1 86.5 44.5" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
    <path d="M 5 2 A 3 3 0 0 0 2 5" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="0.5"/>
    <path d="M 5 66 A 3 3 0 0 1 2 63" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="0.5"/>
    <path d="M 100 2 A 3 3 0 0 1 103 5" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="0.5"/>
    <path d="M 100 66 A 3 3 0 0 0 103 63" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="0.5"/>
  </svg>`;
}

// Positions for horizontal pitch: isLeft=true → home (left half), false → away (right half)
function computeHalfPitchPositionsH(starters, isLeft) {
  const gk   = starters.filter(p => (p.pos||'').startsWith('Gardien')).slice(0, 1);
  const defs = starters.filter(p => (p.pos||'').startsWith('Défenseur'));
  const mids = starters.filter(p => (p.pos||'').startsWith('Milieu'));
  const atts = starters.filter(p => (p.pos||'').startsWith('Attaquant'));
  const { defsF, midsF, attsF } = balancedOutfield(defs, mids, atts);
  const positions = [];

  const xGK  = isLeft ? 4  : 96;
  const xDEF = isLeft ? 15 : 85;
  const xMID = isLeft ? 27 : 73;
  const xATT = isLeft ? 39 : 61;

  if (gk[0]) positions.push({ player: gk[0], left: xGK, top: 50 });

  const defSp = defsF.length > 0 ? 76 / (defsF.length + 1) : 0;
  defsF.forEach((p, i) => positions.push({ player: p, left: xDEF, top: defSp * (i + 1) + 12 }));

  const midSp = midsF.length > 0 ? 76 / (midsF.length + 1) : 0;
  midsF.forEach((p, i) => positions.push({ player: p, left: xMID, top: midSp * (i + 1) + 12 }));

  const attSp = attsF.length > 0 ? 76 / (attsF.length + 1) : 0;
  attsF.forEach((p, i) => positions.push({ player: p, left: xATT, top: attSp * (i + 1) + 12 }));

  return positions;
}

function jerseyIcon(color, number) {
  const c = color || '#2a3a6e';
  const numColor = (c === '#ffffff' || c === '#fcd116' || c === '#ffd100') ? '#000000' : '#ffffff';
  return `<svg viewBox="0 0 36 42" width="30" height="35" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 3px 8px rgba(0,0,0,0.6))">
    <path d="M0,10 L8,5 L13,14 L5,17 Z" fill="${c}" stroke="rgba(0,0,0,0.25)" stroke-width="0.6" stroke-linejoin="round"/>
    <path d="M36,10 L28,5 L23,14 L31,17 Z" fill="${c}" stroke="rgba(0,0,0,0.25)" stroke-width="0.6" stroke-linejoin="round"/>
    <path d="M8,5 Q18,1 28,5 L31,17 L30,40 L6,40 L5,17 Z" fill="${c}" stroke="rgba(0,0,0,0.25)" stroke-width="0.6" stroke-linejoin="round"/>
    <path d="M8,5 Q18,1 28,5 L22,17 L14,17 L5,17 Z" fill="rgba(255,255,255,0.12)" stroke="none"/>
    <path d="M13,5 L18,11 L23,5" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="18" y="30" text-anchor="middle" dominant-baseline="middle" font-family="-apple-system,BlinkMacSystemFont,Helvetica Neue,sans-serif" font-size="12" font-weight="900" fill="${numColor}" opacity="0.95">${number}</text>
  </svg>`;
}

function pitchLabel(name) {
  const clean = cleanPlayerName(name);
  const parts = clean.split(' ').filter(Boolean);
  const allCaps = parts.find(p => p === p.toUpperCase() && p.length > 1);
  const word = allCaps || parts[parts.length - 1];
  return word.length > 7 ? word.slice(0, 6) + '.' : word;
}

function renderPitchNodes(positions, teamColor) {
  return positions.map(pos => {
    const p = pos.player;
    if (!p) return '';
    return `
    <div class="pitch-player" style="left:${pos.left}%;top:${pos.top}%">
      <div class="pitch-player-jersey">${jerseyIcon(teamColor, p.n)}</div>
      <div class="pitch-player-label">${pitchLabel(p.name)}</div>
    </div>`;
  }).join('');
}

function renderPitchLegend() {
  return `<div style="display:flex;gap:12px;margin-top:8px;flex-wrap:wrap;">
    <div style="display:flex;align-items:center;gap:5px;font-size:0.62rem;color:rgba(255,255,255,0.55)">
      <span style="width:9px;height:9px;border-radius:50%;background:#d97706;display:inline-block"></span>GK
    </div>
    <div style="display:flex;align-items:center;gap:5px;font-size:0.62rem;color:rgba(255,255,255,0.55)">
      <span style="width:9px;height:9px;border-radius:50%;background:#2563eb;display:inline-block"></span>DEF
    </div>
    <div style="display:flex;align-items:center;gap:5px;font-size:0.62rem;color:rgba(255,255,255,0.55)">
      <span style="width:9px;height:9px;border-radius:50%;background:#7c3aed;display:inline-block"></span>MIL
    </div>
    <div style="display:flex;align-items:center;gap:5px;font-size:0.62rem;color:rgba(255,255,255,0.55)">
      <span style="width:9px;height:9px;border-radius:50%;background:#dc2626;display:inline-block"></span>ATT
    </div>
  </div>`;
}

function renderPitchSidebar(td, subs) {
  return `
  <div class="pitch-sidebar">
    <div class="pitch-coach-card">
      <div class="pitch-coach-label">Entraîneur</div>
      <div class="pitch-coach-name">${td.coach}</div>
    </div>
    <div class="pitch-subs-card">
      <div class="pitch-subs-title">Remplaçants (${subs.length})</div>
      ${subs.map(p => `
        <div class="pitch-sub-row">
          <div class="pitch-sub-num" style="background:${getPitchColor(p.pos)}">${p.n}</div>
          <div class="pitch-sub-info">
            <div class="pitch-sub-name">${p.name.split(' ').pop()}</div>
            <div class="pitch-sub-pos">${p.pos}</div>
          </div>
        </div>`).join('')}
    </div>
  </div>`;
}

// ── GROUP TEAM IMAGE MAP ──────────────────────────────────────────────
// Groupe-specific avif images (named with group-letter prefix)
const GROUP_TEAM_IMG = {
  // Group A
  'Mexique':           'images/groupe/a mexisue.avif',
  'Rép. tchèque':      'images/groupe/a tchequie.avif',
  'Corée du Sud':      'images/groupe/a koree.avif',
  'Afrique du Sud':    'images/groupe/a afrique du sud.avif',
  // Group B
  'Canada':            'images/groupe/b canada.avif',
  'Suisse':            'images/groupe/b suisse.avif',
  'Qatar':             'images/groupe/b quatar.avif',
  'Bosnie-Herzégovine':'images/groupe/b bosnie.avif',
  // Group C
  'Brésil':            'images/groupe/c bresil.avif',
  'Maroc':             'images/groupe/c maroc.avif',
  'Haïti':             'images/groupe/c haiti.avif',
  'Écosse':            'images/groupe/c ecosse.avif',
  // Group D
  'États-Unis':        'images/groupe/d usa.avif',
  'Australie':         'images/groupe/d australie.avif',
  'Paraguay':          'images/groupe/d paraguay.avif',
  'Turquie':           'images/groupe/d turquie.avif',
  // Group E
  'Allemagne':         'images/groupe/e allemagne.avif',
  'Équateur':          'images/groupe/e equateur.avif',
  "Côte d'Ivoire":     "images/groupe/e cote d'ivoir.avif",
  'Curaçao':           'images/groupe/e curacao.avif',
  // Group F
  'Pays-Bas':          'images/groupe/f pays bas.avif',
  'Japon':             'images/groupe/f japon.avif',
  'Tunisie':           'images/groupe/f tunisie.avif',
  'Suède':             'images/groupe/f suede.avif',
  // Group G
  'Belgique':          'images/groupe/g belgique.avif',
  'Égypte':            'images/groupe/g egypte.avif',
  'Iran':              'images/groupe/g iran.avif',
  'Nouvelle-Zélande':  'images/groupe/g nouvelle zelande.avif',
  // Group H
  'Espagne':           'images/groupe/h espagne.avif',
  'Uruguay':           'images/groupe/h uruguay.avif',
  'Arabie saoudite':   'images/groupe/h arabie saoudite.avif',
  'Cap-Vert':          'images/groupe/h cap vert.avif',
  // Group I
  'France':            'images/groupe/i france.avif',
  'Sénégal':           'images/groupe/i senegal.avif',
  'Norvège':           'images/groupe/i norvege.avif',
  'Irak':              'images/groupe/i irak.avif',
  // Group J
  'Argentine':         'images/groupe/j argentine.avif',
  'Autriche':          'images/groupe/j autriche.avif',
  'Algérie':           'images/groupe/j algerie.avif',
  'Jordanie':          'images/groupe/j jordanie.avif',
  // Group K
  'Portugal':          'images/groupe/k portugal.avif',
  'Colombie':          'images/groupe/k colombie.avif',
  'Ouzbékistan':       'images/groupe/k ouzbekistan.avif',
  // RD Congo : pas d'image « groupe » dédiée → on retombe sur le poster équipe
  // Group L
  'Angleterre':        'images/groupe/l angleterre.avif',
  'Croatie':           'images/groupe/l croatie.avif',
  'Ghana':             'images/groupe/l ghana.avif',
  'Panamá':            'images/groupe/l panama.avif',
};

// ── OPEN GROUP PANEL ──────────────────────────────────────────────────
function setGroupSlide(groupId, idx) {
  const ss = document.getElementById('gp-slideshow-' + groupId);
  if (!ss) return;
  ss._idx = idx;
  ss.querySelectorAll('.gp-slide').forEach((s, i) => s.classList.toggle('active', i === idx));
  ss.querySelectorAll('.gp-slide-tab').forEach((t, i) => t.classList.toggle('active', i === idx));
}

function gpNavGroup(groupId, dir) {
  const ids = GROUPS.map(g => g.id);
  const next = ids.indexOf(groupId) + dir;
  if (next >= 0 && next < ids.length) openGroupPanel(ids[next]);
}

function openGroupPanel(groupId) {
  const group = GROUPS.find(g => g.id === groupId);
  if (!group) return;

  const standings = getGroupStandings(groupId);

  // Build slideshow slides
  const slidesHTML = group.teams.map((t, i) => {
    const img   = GROUP_TEAM_IMG[t.name] || TEAM_BANNER_MAP[t.name] || null;
    const color = getTeamColor(t.name);
    const tn    = t.name.replace(/'/g, "\\'");
    const st    = standings.find(s => s.name === t.name);
    return `
      <div class="gp-slide${i === 0 ? ' active' : ''}" data-idx="${i}" onclick="openTeamPanel('${tn}')">
        ${img
          ? `<div class="gp-slide-blur" style="background-image:url('${img}')"></div>
             <img class="gp-slide-img" src="${img}" alt="${t.name}" loading="lazy" onerror="this.style.display='none'">`
          : `<div class="gp-slide-fb">${t.flag}</div>`}
        <div class="gp-slide-overlay">
          <div class="gp-slide-rank">FIFA #${t.rank}</div>
          <div class="gp-slide-name">${t.flag} ${t.name}</div>
          ${st ? `<div class="gp-slide-pts">${st.pts} pts · ${st.mp} matchs joués</div>` : ''}
        </div>
      </div>`;
  }).join('');

  // Build team tabs
  const tabsHTML = group.teams.map((t, i) => {
    const color = getTeamColor(t.name);
    return `
      <div class="gp-slide-tab${i === 0 ? ' active' : ''}" data-idx="${i}"
           style="--tc:${color}"
           onmouseenter="setGroupSlide('${groupId}',${i})"
           onclick="setGroupSlide('${groupId}',${i})">
        <span>${t.flag}</span>
        <span class="gp-slide-tab-name">${t.name}</span>
      </div>`;
  }).join('');

  // Compact standings rows
  const standingsHTML = standings.map((t, i) => `
    <div class="gp-stand-row-v2 ${i < 2 ? 'qualify' : ''}">
      <span class="gp-sv2-rank">${i + 1}</span>
      <span class="gp-sv2-flag">${t.flag}</span>
      <span class="gp-sv2-name">${t.name}</span>
      <span class="gp-sv2-stat">${t.mp}</span>
      <span class="gp-sv2-stat">${t.w}</span>
      <span class="gp-sv2-stat">${t.d}</span>
      <span class="gp-sv2-stat">${t.l}</span>
      <span class="gp-sv2-stat ${t.gd > 0 ? 'pos' : t.gd < 0 ? 'neg' : ''}">${t.gd > 0 ? '+' : ''}${t.gd}</span>
      <span class="gp-sv2-pts">${t.pts}</span>
    </div>`).join('');

  // Right-panel compact standings (rank + flag + name + MJ + Diff + pts)
  const compactStandingsHTML = standings.map((t, i) => `
    <div class="gp-sv2-compact ${i < 2 ? 'qualify' : ''}">
      <span class="gp-sv2-rank">${i + 1}</span>
      <span class="gp-sv2-flag">${t.flag}</span>
      <span class="gp-sv2-name">${t.name}</span>
      <span class="gp-sv2-stat">${t.mp}</span>
      <span class="gp-sv2-stat ${t.gd > 0 ? 'pos' : t.gd < 0 ? 'neg' : ''}">${t.gd > 0 ? '+' : ''}${t.gd}</span>
      <span class="gp-sv2-pts">${t.pts}</span>
    </div>`).join('');

  // Apple-style match cards (2-column grid, no scroll)
  const _amPseudo = localStorage.getItem('wc2026_pseudo') || '';
  const _amUsers  = _amPseudo ? JSON.parse(localStorage.getItem('wc2026_users') || '{}') : {};
  const appleMatchesHTML = group.matches.map((m, i) => {
    const scoreKey = groupId + '_' + i;
    const score    = state.scores[scoreKey] || m.s;
    const hInfo    = group.teams.find(t => t.name === m.h);
    const aInfo    = group.teams.find(t => t.name === m.a);
    const dateParts = m.d.split(' ');
    const dateLabel = `${dateParts[0]} ${dateParts[1]?.slice(0,3)} · ${m.t}`;
    const hSrc = getFlagImg(hInfo?.code);
    const aSrc = getFlagImg(aInfo?.code);
    const hCircle = hSrc ? `<img src="${hSrc}" class="gp-am-fimg" alt="">` : `<span style="font-size:1.4rem">${hInfo?.flag||''}</span>`;
    const aCircle = aSrc ? `<img src="${aSrc}" class="gp-am-fimg" alt="">` : `<span style="font-size:1.4rem">${aInfo?.flag||''}</span>`;
    const uData   = _amUsers[_amPseudo];
    const myProno = uData ? (uData.pronostics?.[scoreKey]?.score || uData.pronos?.[scoreKey]?.score || '') : '';
    const pronoHtml = myProno
      ? `<div class="gp-am-myprono">${myProno}</div>`
      : (_amPseudo ? `<div class="gp-am-myprono gp-am-myprono--empty">— pas de prono —</div>` : '');
    const realScoreHtml = score
      ? `<div class="gp-am-realscore">Score réel : <strong>${score}</strong></div>`
      : '';
    return `
      <div class="gp-apple-match ${score ? 'played' : ''}" onclick="gpMatchClick('${groupId}',${i})">
        ${pronoHtml}
        <div class="gp-am-date">${dateLabel}</div>
        <div class="gp-am-matchup">
          <div class="gp-am-team">
            <div class="gp-am-circle">${hCircle}</div>
            <span class="gp-am-tname">${m.h}</span>
          </div>
          <div class="gp-am-vscore ${score ? 'has-score' : ''}" data-scorekey="${scoreKey}">${score || '0-0'}</div>
          <div class="gp-am-team">
            <div class="gp-am-circle">${aCircle}</div>
            <span class="gp-am-tname">${m.a}</span>
          </div>
        </div>
        <div class="gp-am-venue">${m.v.split(',')[0]}</div>
      </div>`;
  }).join('');

  // 4 team photos (from images/equipe/)
  const teamPhotosHTML = group.teams.map((t, tIdx) => {
    const bannerSrc = TEAM_BANNER_MAP[t.name];
    const tn = t.name.replace(/'/g, "\\'");
    return `
      <div class="gp-tc" onclick="openTeamPanel('${tn}')">
        ${bannerSrc
          ? `<img class="gp-tc-img" src="${bannerSrc}" alt="${t.name}" loading="lazy" onerror="this.style.display='none'">`
          : `<div class="gp-tc-fb">${t.flag}</div>`}
      </div>`;
  }).join('');

  const html = `
    <div class="gp-showcase">
      <div class="gp-upper">
        <div class="gp-slideshow" id="gp-slideshow-${groupId}">
          <div class="gp-top-bar"></div>
          <div class="gp-slide-img-area">${slidesHTML}</div>
          <div class="gp-top-bar"></div>
          <div class="gp-slide-tabs">${tabsHTML}</div>
        </div>
        <div class="gp-stand-section gp-stand-right">
          <div class="gp-section-label gp-nav-label">
            <button class="gp-nav-btn" onclick="event.stopPropagation();gpNavGroup('${groupId}',-1)">‹</button>
            <span>GROUPE ${groupId} · CLASSEMENT</span>
            <button class="gp-nav-btn" onclick="event.stopPropagation();gpNavGroup('${groupId}',1)">›</button>
          </div>
          <div class="gp-sv2-compact gp-sv2-head">
            <span></span><span></span><span></span>
            <span>MJ</span><span>Diff</span><span class="pts">Pts</span>
          </div>
          ${compactStandingsHTML}
          <div class="gp-qualify-note">▲ Top 2 qualifiés</div>
        </div>
      </div>
      <div class="gp-lower">
        <div class="gp-left-panel">
          <div class="gp-four-teams">${teamPhotosHTML}</div>
        </div>
        <div class="gp-right-panel">
          <div class="gp-apple-grid">${appleMatchesHTML}</div>
        </div>
      </div>
    </div>`;

  openPanel(html, '');
  // Enable full-bleed mode: header floats over image, body has no padding
  const _gpDrawer = document.getElementById('panel-drawer');
  if (_gpDrawer) _gpDrawer.classList.add('gp-mode');

  // Mobile : swipe gauche/droite → groupe précédent/suivant
  if (window.matchMedia('(max-width: 768px)').matches) {
    const body = document.getElementById('panel-body');
    if (body) {
      let _sx = 0, _sy = 0;
      body.ontouchstart = e => { _sx = e.touches[0].clientX; _sy = e.touches[0].clientY; };
      body.ontouchend = e => {
        const dx = e.changedTouches[0].clientX - _sx;
        const dy = e.changedTouches[0].clientY - _sy;
        if (Math.abs(dx) > 70 && Math.abs(dy) < 50) gpNavGroup(groupId, dx < 0 ? 1 : -1);
      };
    }
  }

  // Init slideshow auto-cycle
  requestAnimationFrame(() => {
    const ss = document.getElementById('gp-slideshow-' + groupId);
    if (!ss) return;
    ss._idx = 0;
    const n = group.teams.length;
    const startTimer = () => setInterval(() => {
      ss._idx = (ss._idx + 1) % n;
      setGroupSlide(groupId, ss._idx);
    }, 3000);
    if (window._gpTimer) clearInterval(window._gpTimer);
    window._gpTimer = startTimer();
    ss.addEventListener('mouseenter', () => { clearInterval(window._gpTimer); });
    ss.addEventListener('mouseleave', () => { window._gpTimer = startTimer(); });
  });
}

// ── FRANCE vs SÉNÉGAL PLAYER CARD ────────────────────────────────────
function openFSCard(colEl, player, color) {
  if (!colEl || !player) return;
  const slot = colEl.querySelector('.fs-card-slot');
  if (!slot) return;
  const p = player;
  const height = p.h || '—';
  const club = p.club || '—';
  const caps = (p.caps !== undefined && p.caps !== null) ? p.caps : '—';
  const goals = (p.goals !== undefined && p.goals !== null) ? p.goals : '—';
  const ast = (p.ast !== undefined && p.ast !== null) ? p.ast : '—';
  const age = p.age || '—';
  const bio = (p.bio || '').replace(/\\'/g, "'");
  const safeColor = (color || '#333').replace(/'/g, '');
  slot.innerHTML = `
    <div class="fs-player-card">
      <div class="fs-card-photo-wrap">
        ${p.photo ? `<img class="fs-card-photo" src="${p.photo}" alt="${p.name}" onerror="this.closest('.fs-card-photo-wrap').style.display='none'">` : ''}
        <div class="fs-card-num" style="background:${safeColor}">${p.n !== undefined ? p.n : '—'}</div>
      </div>
      <div class="fs-card-info">
        <button class="fs-card-back-btn" onclick="closeFSCard(this.closest('.fs-col'))">← Retour</button>
        <div class="fs-card-name">${p.name || ''}</div>
        <div class="fs-card-pos">${p.pos || ''}${height !== '—' ? ' · ' + height : ''}</div>
        ${club !== '—' ? `<div class="fs-card-club">⚽ ${club}</div>` : ''}
        <div class="fs-card-stats">
          <div class="fs-card-stat"><span class="fs-card-stat-val">${caps}</span><span class="fs-card-stat-lbl">Sélections</span></div>
          <div class="fs-card-stat"><span class="fs-card-stat-val">${goals}</span><span class="fs-card-stat-lbl">Buts</span></div>
          <div class="fs-card-stat"><span class="fs-card-stat-val">${ast}</span><span class="fs-card-stat-lbl">Passes D.</span></div>
          <div class="fs-card-stat"><span class="fs-card-stat-val">${age}</span><span class="fs-card-stat-lbl">Âge</span></div>
        </div>
        ${bio ? `<p class="fs-card-bio">${bio}</p>` : ''}
      </div>
    </div>`;
  colEl.classList.add('fs-card-active');
}

function closeFSCard(colEl) {
  if (!colEl) return;
  colEl.classList.remove('fs-card-active');
  setTimeout(() => {
    if (!colEl.classList.contains('fs-card-active')) {
      const slot = colEl.querySelector('.fs-card-slot');
      if (slot) slot.innerHTML = '';
    }
  }, 380);
}

// ── OPEN MATCH PITCH PANEL ────────────────────────────────────────────
// ── CONFRONTATION WC STATS (replaces pronostic block) ────────────────
function _wcStatCol(teamName, flag, side) {
  const p = PALMARES[teamName];
  if (!p) {
    return `<div class="cws-col cws-${side}">
      <div class="cws-hd"><span class="cws-flag">${flag}</span><span class="cws-team">${teamName}</span></div>
      <div class="cws-empty">Pas d'historique mondial</div>
    </div>`;
  }
  const cmLbl = p.cm === 1 ? 'Titre mondial' : 'Titres mondiaux';
  const rows = [
    ['🌍', 'Participations CM', p.partCM],
    ['🥇', cmLbl, p.cm],
    ['🎯', 'Meilleur résultat', p.bestCM],
    ['⚽', 'Top buteur', p.buteur],
    ['🎽', 'Record sélections', p.recordman],
  ];
  const trophees = (p.trophees || []).filter(t => /CM|Mondi|Coupe du Monde/i.test(t));
  return `<div class="cws-col cws-${side}">
    <div class="cws-hd"><span class="cws-flag">${flag}</span><span class="cws-team">${teamName}</span></div>
    <div class="cws-bignum-row">
      <div class="cws-big"><div class="cws-big-n">${p.partCM}</div><div class="cws-big-l">Mondiaux</div></div>
      <div class="cws-big"><div class="cws-big-n">${p.cm}</div><div class="cws-big-l">${p.cm === 1 ? 'Titre' : 'Titres'}</div></div>
    </div>
    <div class="cws-rows">
      ${rows.map(r => `<div class="cws-row"><span class="cws-ico">${r[0]}</span><span class="cws-lbl">${r[1]}</span><span class="cws-val">${r[2]}</span></div>`).join('')}
    </div>
    ${trophees.length ? `<div class="cws-trophees">${trophees.map(t => `<span class="cws-trophy">🏆 ${t}</span>`).join('')}</div>` : ''}
  </div>`;
}

function renderConfrontWCStats(homeTeam, awayTeam, hFlag, aFlag) {
  return `
  <div class="confront-wc-stats">
    <div class="cws-title">📊 Bilan en Coupe du Monde</div>
    <div class="cws-grid">
      ${_wcStatCol(homeTeam, hFlag, 'home')}
      <div class="cws-vs">VS</div>
      ${_wcStatCol(awayTeam, aFlag, 'away')}
    </div>
  </div>`;
}

function openMatchPitchPanel(groupId, matchIdx) {
  const group = GROUPS.find(g => g.id === groupId);
  if (!group) return;
  const m = group.matches[matchIdx];
  if (!m) return;

  const homeTd = getTeamData(m.h);
  const awayTd = getTeamData(m.a);
  const hInfo = group.teams.find(t => t.name === m.h);
  const aInfo = group.teams.find(t => t.name === m.a);
  const hFlag = hInfo ? hInfo.flag : '';
  const aFlag = aInfo ? aInfo.flag : '';
  const score = state.scores[groupId + '_' + matchIdx];

  const scoreKey = groupId + '_' + matchIdx;
  const isFranceSenegal = true; // player cards enabled for all matches
  // Use CONFRONTATION_MAP (covers groups A-I) for the flip card image
  const confrontImgUrl = getConfrontationImg(m.h, m.a);

  // Use ORIGINAL_LINEUPS (before squad_patch overwrites) for match starters
  const hPool = (ORIGINAL_LINEUPS && ORIGINAL_LINEUPS[m.h]) || (homeTd ? homeTd.players : []);
  const aPool = (ORIGINAL_LINEUPS && ORIGINAL_LINEUPS[m.a]) || (awayTd ? awayTd.players : []);

  const hStarters = hPool.filter(p => p.role === 'Titulaire');
  const hSubs     = hPool.filter(p => p.role === 'Remplaçant');
  const aStarters = aPool.filter(p => p.role === 'Titulaire');
  const aSubs     = aPool.filter(p => p.role === 'Remplaçant');

  // Team colors needed early (used in centerHtml template)
  const hColor = getTeamColor(m.h);
  const aColor = getTeamColor(m.a);

  // Vertical pitch positions (home=top, away=bottom)
  const hPositionsV = computeHalfPitchPositions(hStarters, true);
  const aPositionsV = computeHalfPitchPositions(aStarters, false);

  function posShort(pos) {
    if (pos === 'Gardien')   return 'GK';
    if (pos === 'Défenseur') return 'DEF';
    if (pos === 'Milieu')    return 'MIL';
    if (pos === 'Attaquant') return 'ATT';
    return pos.slice(0, 3).toUpperCase();
  }

  // photo outer side of row: left col → photo first, right col → photo last (row-reverse)
  function playerRow(p, rev, isSub, teamColor, fsteam, fsidx) {
    const photo = `<img class="mpp-photo${isSub ? ' mpp-photo-sub' : ''}" src="${p.photo || ''}" alt="" onerror="this.style.display='none'">`;
    const num   = `<div class="mpp-num${isSub ? ' mpp-num-sub' : ''}" style="background:${teamColor}">${p.n}</div>`;
    const name  = `<span class="mpp-pname${isSub ? ' mpp-pname-sub' : ''}">${p.name.split(' ').pop()}</span>`;
    const pos   = `<span class="mpp-ppos">${posShort(p.pos)}</span>`;
    const fsAttrs = (isFranceSenegal && fsteam !== undefined)
      ? ` data-fsteam="${fsteam}" data-fsidx="${fsidx}"` : '';
    return `<div class="mpp-player-row${rev ? ' mpp-row-rev' : ''}${isSub ? ' mpp-row-sub' : ''}${isFranceSenegal ? ' fs-clickable' : ''}"${fsAttrs}>${photo}${num}${name}${pos}</div>`;
  }

  function teamCol(td, flag, name, starters, subs, rev, teamColor, fsteam) {
    const baseCls = rev ? 'mpp-team-col mpp-col-right' : 'mpp-team-col mpp-col-left';
    const cls = isFranceSenegal ? baseCls + ' fs-col' : baseCls;
    const fsId = isFranceSenegal ? ` id="${rev ? 'fs-col-away' : 'fs-col-home'}"` : '';
    if (!td) return `<div class="${cls}"${fsId}><div class="mpp-na">N/A</div></div>`;
    // Coach avatar
    const coachName = td.coach || '';
    const initials = coachName.split(' ').slice(-2).map(w => w[0] || '').join('').toUpperCase().slice(0,2);
    const photoUrl = COACH_PHOTOS[coachName] || null;
    const safeColor = teamColor.replace(/'/g, '');
    const coachImg = photoUrl
      ? `<img class="mpp-coach-photo" src="${photoUrl}" alt="${coachName}" onerror="this.outerHTML='<div class=mpp-coach-initials style=background:${safeColor}>${initials}</div>'">`
      : `<div class="mpp-coach-initials" style="background:${safeColor}">${initials}</div>`;
    const header = `<div class="mpp-team-hd${rev ? ' mpp-hd-rev' : ''}">
        <span class="mpp-team-flag">${flag}</span>
        <span class="mpp-team-name-lbl">${name}</span>
      </div>`;
    if (isFranceSenegal) {
      const starterRows = starters.map((p, i) => playerRow(p, rev, false, teamColor, fsteam, i)).join('');
      const subRows = subs.map((p, i) => playerRow(p, rev, true, teamColor, fsteam, starters.length + i)).join('');
      return `<div class="${cls}"${fsId}>
        ${header}
        <div class="fs-col-body">
          <div class="mpp-coach-row${rev ? ' mpp-coach-rev' : ''}">
            ${coachImg}
            <span class="mpp-coach-name">${coachName}</span>
          </div>
          <div class="mpp-section-lbl">Titulaires</div>
          ${starterRows}
          <div class="mpp-section-lbl mpp-subs-lbl">Remplaçants</div>
          ${subRows}
        </div>
        <div class="fs-card-slot"></div>
      </div>`;
    }
    return `<div class="${cls}">
      ${header}
      <div class="mpp-coach-row${rev ? ' mpp-coach-rev' : ''}">
        ${coachImg}
        <span class="mpp-coach-name">${coachName}</span>
      </div>
      <div class="mpp-section-lbl">Titulaires</div>
      ${starters.map(p => playerRow(p, rev, false, teamColor)).join('')}
      <div class="mpp-section-lbl mpp-subs-lbl">Remplaçants</div>
      ${subs.map(p => playerRow(p, rev, true, teamColor)).join('')}
    </div>`;
  }

  function renderPitchCircles(positions, teamColor, labelAbove) {
    return positions.map(pos => {
      const p = pos.player;
      if (!p) return '';
      const photo = p.photo ? `<img src="${p.photo}" alt="" onerror="this.style.display='none'">` : '';
      const chip = `<div class="mpp-player-chip">
        <div class="mpp-chip-inner">
          <div class="mpp-chip-front">${photo}</div>
          <div class="mpp-chip-back" style="background:${teamColor}"><span>${p.n || ''}</span></div>
        </div>
      </div>`;
      const label = `<div class="pitch-player-label">${pitchLabel(p.name)}</div>`;
      return `<div class="pitch-player${labelAbove ? ' label-above' : ''}" style="left:${pos.left}%;top:${pos.top}%">
        ${labelAbove ? label + chip : chip + label}
      </div>`;
    }).join('');
  }

  // Center column: flip card (hover = image→pitch with photo circles at tactical positions)
  const pitchFaceHtml = `
    <div class="football-pitch mpp-flip-pitch">
      ${renderPitchLines()}
      <div class="pitch-players">
        ${renderPitchCircles(hPositionsV, hColor, true)}
        ${renderPitchCircles(aPositionsV, aColor, false)}
      </div>
    </div>`;

  const centerHtml = confrontImgUrl
    ? `<div class="mpp-flip-card" title="Survole pour voir le terrain" style="--hc:${hColor};--ac:${aColor}">
        <div class="mpp-flip-inner">
          <div class="mpp-flip-front">
            <img src="${confrontImgUrl}" alt="${m.h} vs ${m.a}" onerror="this.closest('.mpp-flip-card').classList.add('mpp-flip-no-img')">
          </div>
          <div class="mpp-flip-back">
            ${pitchFaceHtml}
          </div>
        </div>
        <div class="mpp-flip-hint">🔄 Survoler</div>
      </div>`
    : `<div class="mpp-pitch-wrap">
        <div class="football-pitch">
          ${renderPitchLines()}
          <div style="position:absolute;top:4px;left:50%;transform:translateX(-50%);font-size:0.42rem;font-weight:700;color:rgba(255,255,255,0.38);text-transform:uppercase;letter-spacing:0.07em;z-index:3;pointer-events:none;white-space:nowrap">${hFlag} ${m.h}</div>
          <div style="position:absolute;bottom:4px;left:50%;transform:translateX(-50%);font-size:0.42rem;font-weight:700;color:rgba(255,255,255,0.38);text-transform:uppercase;letter-spacing:0.07em;z-index:3;pointer-events:none;white-space:nowrap">${m.a} ${aFlag}</div>
          <div class="pitch-players">
            ${renderPitchCircles(hPositionsV, getTeamColor(m.h), true)}
            ${renderPitchCircles(aPositionsV, getTeamColor(m.a), false)}
          </div>
        </div>
      </div>`;

  const html = `
  <div class="mpp-container">
    <div class="mpp-header-bar">
      <div class="mpp-hb-side">
        <span class="mpp-hb-flag">${hFlag}</span>
        <span class="mpp-hb-name">${m.h}</span>
      </div>
      <div class="mpp-hb-center">
        ${score
          ? `<span class="mpp-hb-score-txt">${score}</span>`
          : `<span class="mpp-vs-text">VS</span>`}
        <span class="mpp-hb-info">${m.d} · ${m.t} · ${m.v.split(',')[0]}</span>
      </div>
      <div class="mpp-hb-side mpp-hb-right">
        <span class="mpp-hb-name">${m.a}</span>
        <span class="mpp-hb-flag">${aFlag}</span>
      </div>
    </div>
    <div class="mpp-body">
      ${teamCol(homeTd, hFlag, m.h, hStarters, hSubs, false, hColor, 'h')}
      <div class="mpp-center">
        ${centerHtml}
      </div>
      ${teamCol(awayTd, aFlag, m.a, aStarters, aSubs, true, aColor, 'a')}
    </div>
    <button class="panel-back-btn mpp-back" onclick="openGroupPanel('${groupId}')">← Groupe ${groupId}</button>
    ${renderConfrontWCStats(m.h, m.a, hFlag, aFlag)}
  </div>`;

  openPanel(html, '');

  if (isFranceSenegal) {
    window.__fsHome = [...hStarters, ...hSubs];
    window.__fsAway = [...aStarters, ...aSubs];
    window.__fsHColor = hColor;
    window.__fsAColor = aColor;
    document.querySelectorAll('[data-fsteam]').forEach(el => {
      el.addEventListener('click', () => {
        const team = el.dataset.fsteam;
        const idx = parseInt(el.dataset.fsidx);
        const pool = team === 'h' ? window.__fsHome : window.__fsAway;
        const color = team === 'h' ? window.__fsHColor : window.__fsAColor;
        const colEl = document.getElementById(team === 'h' ? 'fs-col-home' : 'fs-col-away');
        openFSCard(colEl, pool[idx], color);
      });
    });
  }
}

// ── OPEN TEAM PANEL ───────────────────────────────────────────────────
// ── PALMARES SIDEBAR ──────────────────────────────────────────────────
function renderPalmaresSidebar(teamName) {
  const p = PALMARES[teamName];
  if (!p) return '';

  const tropheesTags = (p.trophees || []).map(t =>
    `<span class="palmares-trophee-tag">${t}</span>`
  ).join('');

  const cmLabel = p.cm === 1 ? 'Titre Mondial' : 'Titres Mondiaux';
  const contLabel = p.cont === 1 ? `Titre ${p.contNom}` : `Titres ${p.contNom}`;

  return `
  <div class="palmares-sidebar">
    <div class="palmares-title">Palmarès</div>
    <div class="palmares-big-stat">
      <div class="palmares-big-num">${p.cm}</div>
      <div class="palmares-big-lbl">${cmLabel}</div>
    </div>
    ${p.cont > 0 ? `<div class="palmares-big-stat">
      <div class="palmares-big-num">${p.cont}</div>
      <div class="palmares-big-lbl">${contLabel}</div>
    </div>` : ''}
    <div class="palmares-divider"></div>
    <div class="palmares-row">
      <span class="palmares-row-lbl">Participations CM</span>
      <span class="palmares-row-val">${p.partCM}</span>
    </div>
    <div class="palmares-row">
      <span class="palmares-row-lbl">Meilleur résultat</span>
      <span class="palmares-row-val">${p.bestCM}</span>
    </div>
    <div class="palmares-divider"></div>
    <div class="palmares-row">
      <span class="palmares-row-lbl">Top buteur</span>
      <span class="palmares-row-val">${p.buteur}</span>
    </div>
    <div class="palmares-row">
      <span class="palmares-row-lbl">Record caps</span>
      <span class="palmares-row-val">${p.recordman}</span>
    </div>
    ${tropheesTags ? `<div class="palmares-divider"></div>
    <div class="palmares-trophees">${tropheesTags}</div>` : ''}
  </div>`;
}

// ── TEAM BANNER MAP ──────────────────────────────────────────────────
const TEAM_BANNER_MAP = {
  'France':              'images/equipe/france.png',
  'Allemagne':           'images/equipe/allemagne.png',
  'Espagne':             'images/equipe/espagne.png',
  'Argentine':           'images/equipe/argentine.png',
  'Brésil':              'images/equipe/bresil.png',
  'Portugal':            'images/equipe/portugal.png',
  'Angleterre':          'images/equipe/angleterre.png',
  'Pays-Bas':            'images/equipe/pays%20bas.png',
  'Belgique':            'images/equipe/belgique.png',
  'Maroc':               'images/equipe/maroc.png',
  'Japon':               'images/equipe/japon.png',
  'Colombie':            'images/equipe/colombie.png',
  'Uruguay':             'images/equipe/uruguay.png',
  'Mexique':             'images/equipe/mexique.png',
  'Corée du Sud':        'images/equipe/coree%20du%20sud.png',
  'Afrique du Sud':      'images/equipe/afrique%20du%20sud.png',
  'Canada':              'images/equipe/canada.png',
  'Suisse':              'images/equipe/suisse.png',
  'Qatar':               'images/equipe/quatar.png',
  'Bosnie-Herzégovine':  'images/equipe/Bosnie-Herz%C3%A9govine.png',
  'Croatie':             'images/equipe/croatie.png',
  'Australie':           'images/equipe/australie.png',
  'Écosse':              'images/equipe/ecosse.png',
  'Équateur':            'images/equipe/equateur.png',
  'Paraguay':            'images/equipe/paraguay.png',
  'Norvège':             'images/equipe/norvege.png',
  'Cap-Vert':            'images/equipe/Cap%20vert.png',
  'États-Unis':          'images/equipe/usa.png',
  'Sénégal':             'images/equipe/senegal.png',
  'Tunisie':             'images/equipe/tunisie.png',
  'Algérie':             'images/equipe/algerie.png',
  'Autriche':            'images/equipe/autriche.png',
  'Jordanie':            'images/equipe/jordanie.png',
  'Curaçao':             'images/equipe/curacao.png',
  'Ghana':               'images/equipe/ghana.png',
  'Panamá':              'images/equipe/panama.png',
  'Iran':                'images/equipe/iran.png',
  'Irak':                'images/equipe/irak.png',
  'Égypte':              'images/equipe/egypte.png',
  'Ouzbékistan':         'images/equipe/ouzbekistan.png',
  'Turquie':             'images/equipe/turquie.png',
  "Côte d'Ivoire":       "images/equipe/cote%20d'ivoir.png",
  'Arabie saoudite':     'images/equipe/arabie%20saoudite.png',
  'RD Congo':            'images/equipe/republique%20du%20congo.png',
  'Rép. tchèque':        'images/equipe/republique%20tcheque.png',
  'Suède':               'images/equipe/suede.png',
  'Haïti':               'images/equipe/haiti.png',
  'Nouvelle-Zélande':    'images/equipe/nouvelle%20zelande.jpeg',
};

// ── Confrontation images (match poster per pair) ──────────────────────
const CONFRONTATION_MAP = {
  // Groupe A
  'Mexique||Rép. tchèque':          "images/confrontation/Mexique - Rép. tchèque.png",
  'Corée du Sud||Afrique du Sud':   "images/confrontation/Corée du Sud - Afrique du Sud.png",
  'Mexique||Corée du Sud':          "images/confrontation/Mexique - Corée du Sud.png",
  'Rép. tchèque||Afrique du Sud':   "images/confrontation/Rép. tchèque - Afrique du Sud.png",
  'Mexique||Afrique du Sud':        "images/confrontation/Mexique - Afrique du Sud.png",
  'Rép. tchèque||Corée du Sud':     "images/confrontation/Rép. tchèque - Corée du Sud.png",
  // Groupe B
  'Canada||Suisse':                 "images/confrontation/Canada - Suisse.png",
  'Qatar||Bosnie-Herzégovine':      "images/confrontation/Qatar - Bosnie-Herzégovine.png",
  'Canada||Qatar':                  "images/confrontation/Canada - Qatar.png",
  'Suisse||Bosnie-Herzégovine':     "images/confrontation/Suisse - Bosnie-Herzégovine.png",
  'Canada||Bosnie-Herzégovine':     "images/confrontation/Canada - Bosnie-Herzégovine.png",
  'Suisse||Qatar':                  "images/confrontation/Suisse - Qatar.png",
  // Groupe C
  'Brésil||Maroc':                  "images/confrontation/Brésil - Maroc.png",
  'Haïti||Écosse':                  "images/confrontation/Haïti - Écosse.png",
  'Brésil||Haïti':                  "images/confrontation/Brésil - Haïti.png",
  'Maroc||Écosse':                  "images/confrontation/Maroc - Écosse.png",
  'Brésil||Écosse':                 "images/confrontation/Brésil - Écosse.png",
  'Maroc||Haïti':                   "images/confrontation/Maroc - Haïti.png",
  // Groupe D
  'États-Unis||Paraguay':           "images/confrontation/États-Unis - Paraguay.png",
  'Australie||Turquie':             "images/confrontation/Australie - Turquie.png",
  'États-Unis||Australie':          "images/confrontation/États-Unis - Australie.png",
  'Paraguay||Turquie':              "images/confrontation/Paraguay - Turquie.png",
  'États-Unis||Turquie':            "images/confrontation/États-Unis - Turquie.png",
  'Paraguay||Australie':            "images/confrontation/Paraguay - Australie.png",
  // Groupe E
  "Allemagne||Côte d'Ivoire":       "images/confrontation/Allemagne - Côte d'Ivoire.png",
  'Équateur||Curaçao':              "images/confrontation/Équateur - Curaçao.png",
  'Allemagne||Équateur':            "images/confrontation/Allemagne - Équateur.png",
  "Côte d'Ivoire||Curaçao":         "images/confrontation/Côte d'Ivoire - Curaçao.png",
  'Allemagne||Curaçao':             "images/confrontation/Allemagne - Curaçao.png",
  "Côte d'Ivoire||Équateur":        "images/confrontation/Côte d'Ivoire - Équateur.png",
  // Groupe F
  'Pays-Bas||Tunisie':              "images/confrontation/Pays-Bas - Tunisie.png",
  'Japon||Suède':                   "images/confrontation/Japon - Suède.png",
  'Pays-Bas||Japon':                "images/confrontation/Pays-Bas - Japon.png",
  'Tunisie||Suède':                 "images/confrontation/Tunisie - Suède.png",
  'Pays-Bas||Suède':                "images/confrontation/Pays-Bas - Suède.png",
  'Japon||Tunisie':                 "images/confrontation/Japon - Tunisie.png",
  // Groupe G
  'Belgique||Égypte':               "images/confrontation/Belgique - Égypte.png",
  'Iran||Nouvelle-Zélande':         "images/confrontation/Iran - Nouvelle-Zélande.png",
  'Belgique||Iran':                 "images/confrontation/Belgique - Iran.png",
  'Égypte||Nouvelle-Zélande':       "images/confrontation/Égypte - Nouvelle-Zélande.png",
  'Belgique||Nouvelle-Zélande':     "images/confrontation/Belgique - Nouvelle-Zélande.png",
  'Égypte||Iran':                   "images/confrontation/Égypte - Iran.png",
  // Groupe H
  'Espagne||Arabie saoudite':       "images/confrontation/Espagne - Arabie saoudite.png",
  'Uruguay||Cap-Vert':              "images/confrontation/Uruguay - Cap-Vert.png",
  'Espagne||Uruguay':               "images/confrontation/Espagne - Uruguay.png",
  'Arabie saoudite||Cap-Vert':      "images/confrontation/Arabie saoudite - Cap-Vert.png",
  'Espagne||Cap-Vert':              "images/confrontation/Espagne - Cap-Vert.png",
  'Arabie saoudite||Uruguay':       "images/confrontation/Arabie saoudite - Uruguay.png",
  // Groupe I
  'France||Sénégal':                "images/confrontation/France - Sénégal.png",
  'Norvège||Irak':                  "images/confrontation/Norvège - Irak.png",
  'France||Norvège':                "images/confrontation/France - Norvège.png",
  'Sénégal||Irak':                  "images/confrontation/Sénégal - Irak.png",
  'France||Irak':                   "images/confrontation/France - Irak.png",
  'Sénégal||Norvège':               "images/confrontation/Sénégal - Norvège.png",
  // Groupe J
  'Argentine||Autriche':            "images/confrontation/Argentine - Autriche.png",
  'Algérie||Jordanie':              "images/confrontation/Algérie - Jordanie.png",
  'Argentine||Algérie':             "images/confrontation/Argentine - Algérie.png",
  'Autriche||Jordanie':             "images/confrontation/Autriche - Jordanie.png",
  'Argentine||Jordanie':            "images/confrontation/Argentine - Jordanie.png",
  'Autriche||Algérie':              "images/confrontation/Autriche - Algérie.png",
  // Groupe K
  'Portugal||Colombie':             "images/confrontation/Portugal - Colombie.jpeg",
  'Ouzbékistan||RD Congo':          "images/confrontation/Ouzbékistan - RD Congo.png",
  'Portugal||Ouzbékistan':          "images/confrontation/Portugal - Ouzbékistan.png",
  'Colombie||RD Congo':             "images/confrontation/Colombie - RD Congo.jpeg",
  'Portugal||RD Congo':             "images/confrontation/Portugal - RD Congo.jpeg",
  'Colombie||Ouzbékistan':          "images/confrontation/Colombie - Ouzbékistan.jpeg",
  // Groupe L
  'Angleterre||Ghana':              "images/confrontation/Angleterre - Ghana.png",
  'Croatie||Panamá':                "images/confrontation/Croatie - Panamá.png",
  'Angleterre||Panamá':             "images/confrontation/Angleterre - panama.png",
  'Ghana||Croatie':                 "images/confrontation/Ghana - Croatie.png",
  'Angleterre||Croatie':            "images/confrontation/Angleterre - Croatie.png",
  'Ghana||Panamá':                  "images/confrontation/Ghana - Panamá.png",
};

function getConfrontationImg(home, away) {
  return CONFRONTATION_MAP[home + '||' + away] || CONFRONTATION_MAP[away + '||' + home] || null;
}

function getOfficialStarters(teamName) {
  const td = getTeamData(teamName);
  const originalPool = (typeof ORIGINAL_LINEUPS !== 'undefined' && ORIGINAL_LINEUPS[teamName])
    ? ORIGINAL_LINEUPS[teamName]
    : null;
  const pool = (originalPool && originalPool.length) ? originalPool : (td?.players || []);
  const starters = pool.filter(p => p.role === 'Titulaire');
  return (starters.length >= 11 ? starters : pool).slice(0, 11);
}

function renderCalendarLineup(teamName, flag, teamColor) {
  const td = getTeamData(teamName);
  const starters = getOfficialStarters(teamName);
  const formation = td?.formation || 'XI';
  const rows = starters.map((p, idx) => {
    const shirt = p.n || idx + 1;
    const name = cleanPlayerName(p.name);
    const shortName = name.split(' ').slice(-2).join(' ');
    const tn = teamName.replace(/'/g, "\\'");
    return `
      <div class="mc-lineup-player mc-lineup-clickable" onclick="event.stopPropagation();showCalPlayerCard('${tn}','${p.id}',this)">
        <span class="mc-lineup-num" style="--tc:${teamColor}">${shirt}</span>
        <span class="mc-lineup-name">${shortName}</span>
        <span class="mc-lineup-arrow">›</span>
      </div>`;
  }).join('');

  return `
    <div class="mc-lineup-team">
      <div class="mc-lineup-team-head">
        <span class="mc-lineup-flag">${flag}</span>
        <div class="mc-lineup-title-wrap">
          <span class="mc-lineup-team-name">${teamName}</span>
          <span class="mc-lineup-formation">${formation}</span>
        </div>
      </div>
      <div class="mc-lineup-list">
        ${rows || '<div class="mc-lineup-empty">Titulaires non renseignés</div>'}
      </div>
    </div>`;
}

const FIFA_TO_FLAG = {
  'MEX':'mx','CZE':'cz','KOR':'kr','ZAF':'za','RSA':'za','CAN':'ca','SUI':'ch',
  'QAT':'qa','BIH':'ba','BRA':'br','MAR':'ma','HAI':'ht','SCO':'gb-sct',
  'USA':'us','AUS':'au','PAR':'py','TUR':'tr','GER':'de','ECU':'ec',
  'CIV':'ci','CUW':'cw','NED':'nl','JPN':'jp','TUN':'tn','SWE':'se',
  'BEL':'be','EGY':'eg','IRN':'ir','NZL':'nz','ESP':'es','URU':'uy',
  'KSA':'sa','CPV':'cv','FRA':'fr','SEN':'sn','NOR':'no','IRQ':'iq',
  'ARG':'ar','AUT':'at','ALG':'dz','JOR':'jo','POR':'pt','COL':'co',
  'UZB':'uz','COD':'cd','ENG':'gb-eng','CRO':'hr','GHA':'gh','PAN':'pa'
};
function getFlagImg(code) {
  const f = FIFA_TO_FLAG[code];
  return f ? `images/flags/${f}.png` : null;
}

function openTeamPanel(teamName) {
  const td = getTeamData(teamName);
  if (!td) {
    openPanel(`<div class="panel-empty"><p>Données non disponibles pour ${teamName}</p></div>`, teamName);
    return;
  }

  const bannerSrc = TEAM_BANNER_MAP[teamName] || null;
  const tn = teamName.replace(/'/g, "\\'");

  // Group & sort players by position
  const posOrder  = ['Gardien', 'Défenseur', 'Milieu', 'Attaquant'];
  const posLabels = { 'Gardien':'GARDIENS', 'Défenseur':'DÉFENSEURS', 'Milieu':'MILIEUX', 'Attaquant':'ATTAQUANTS' };
  const byPos = {};
  posOrder.forEach(k => byPos[k] = []);
  td.players.forEach(p => {
    const key = posOrder.find(k => p.pos && p.pos.startsWith(k)) || 'Milieu';
    byPos[key].push(p);
  });
  posOrder.forEach(pos => byPos[pos].sort((a, b) => {
    if (a.role === b.role) return (a.n || 0) - (b.n || 0);
    return a.role === 'Titulaire' ? -1 : 1;
  }));

  const firstPlayer = td.players.find(p => p.role === 'Titulaire') || td.players[0];

  const rosterHTML = posOrder.map(pos => {
    const players = byPos[pos];
    if (!players || players.length === 0) return '';
    return `
      <div class="tp-pos-section">
        <div class="tp-pos-title">${posLabels[pos]}</div>
        ${players.map(p => `
          <div class="tp-player-row${firstPlayer && p.id === firstPlayer.id ? ' active' : ''}" data-pid="${p.id}"
               onclick="showTeamPlayerDetail('${tn}','${p.id}')">
            <span class="tp-pr-num">${p.n || '—'}</span>
            <span class="tp-pr-name">${cleanPlayerName(p.name)}</span>
            <span class="tp-pr-club">${p.club || ''}</span>
          </div>`).join('')}
      </div>`;
  }).join('');

  const html = `
    <div class="tp-showcase">
      <div class="tp-hero-mobile">
        <div class="tp-hm-banner">
          ${bannerSrc
            ? `<img src="${bannerSrc}" alt="${teamName}" onerror="this.style.display='none'">`
            : `<div class="tp-banner-fb">${td.flag}</div>`}
          <div class="tp-hm-country">${td.flag} ${teamName}</div>
        </div>
        <div class="tp-hm-player" id="tp-hm-player">
          ${firstPlayer ? _tpHeroPlayerHtml(firstPlayer, teamName, td) : ''}
        </div>
      </div>
      <div class="tp-banner-col">
        ${bannerSrc
          ? `<img src="${bannerSrc}" alt="${teamName}" class="tp-banner-img" onerror="this.parentElement.innerHTML='<div class=tp-banner-fb>${td.flag}</div>'">`
          : `<div class="tp-banner-fb">${td.flag}</div>`}
      </div>
      <div class="tp-roster-col">${rosterHTML}</div>
      <div class="tp-detail-col" id="tp-detail-col">
        ${firstPlayer ? renderTPPlayerDetail(firstPlayer, teamName, td) : ''}
      </div>
    </div>`;

  openPanel(html, `${td.flag} ${teamName}`);
}

// Moitié droite du hero mobile : photo du joueur sélectionné + stats clés
function _tpHeroPlayerHtml(p, teamName, td) {
  const teamColor = getTeamColor(teamName);
  const cleanName = cleanPlayerName(p.name);
  const isReal = p.photo && !p.photo.includes('dicebear');
  const photoHtml = isReal
    ? `<img class="tp-hm-photo" src="${p.photo}" alt="${cleanName}" onerror="this.src='${getPlayerFallbackUrl(p.name, teamName)}'">`
    : `<div class="tp-hm-photo-fb" style="background:${teamColor}">${getPlayerInitials(p.name)}</div>`;
  return `
    ${photoHtml}
    <div class="tp-hm-stats">
      <div class="tp-hm-name">${cleanName}</div>
      <div class="tp-hm-stat"><b>${p.n || '—'}</b><span>N°</span></div>
      <div class="tp-hm-stat"><b>${p.goals ?? 0}</b><span>Buts</span></div>
      <div class="tp-hm-stat"><b>${p.caps ?? 0}</b><span>Sél.</span></div>
      <div class="tp-hm-stat"><b>${p.age ?? '—'}</b><span>Ans</span></div>
    </div>`;
}

function showTeamPlayerDetail(teamName, playerId) {
  const td = getTeamData(teamName);
  if (!td) return;
  const p = td.players.find(pl => pl.id === playerId);
  if (!p) return;
  document.querySelectorAll('.tp-player-row').forEach(r => r.classList.remove('active'));
  const row = document.querySelector(`.tp-player-row[data-pid="${playerId}"]`);
  if (row) row.classList.add('active');
  const col = document.getElementById('tp-detail-col');
  if (col) col.innerHTML = renderTPPlayerDetail(p, teamName, td);
  const hero = document.getElementById('tp-hm-player');
  if (hero) hero.innerHTML = _tpHeroPlayerHtml(p, teamName, td);
  // Mobile : descend automatiquement sur la fiche du joueur
  if (col && window.matchMedia('(max-width: 768px)').matches) {
    setTimeout(() => {
      const body = document.getElementById('panel-body');
      if (!body) return;
      const target = body.scrollTop + col.getBoundingClientRect().top - body.getBoundingClientRect().top - 8;
      // animation manuelle : scrollTo smooth / rAF peu fiables selon contexte
      const start = body.scrollTop, dist = target - start, t0 = Date.now();
      const iv = setInterval(() => {
        const p = Math.min((Date.now() - t0) / 350, 1);
        body.scrollTop = start + dist * (1 - Math.pow(1 - p, 3));
        if (p >= 1) clearInterval(iv);
      }, 16);
    }, 80);
  }
}

function renderTPPlayerDetail(p, teamName, td) {
  const teamColor = getTeamColor(teamName);
  const cleanName = cleanPlayerName(p.name);
  const isReal = p.photo && !p.photo.includes('dicebear');
  const photoHtml = isReal
    ? `<img class="tp-pd-photo" src="${p.photo}" alt="${cleanName}"
           onerror="this.src='${getPlayerFallbackUrl(p.name, teamName)}'">`
    : `<div class="tp-pd-avatar" style="background:${teamColor}">${getPlayerInitials(p.name)}</div>`;

  // WC career goals from WC_GOALS map (if exists)
  const wcGoals = (typeof WC_GOALS !== 'undefined' && WC_GOALS[p.id]) ? WC_GOALS[p.id] : (p.wc_goals || 0);
  const numDisplay = p.n ? `#${p.n}` : '—';

  return `
    <div class="tp-pd-flag-bar">${td.flag} <span>${teamName.toUpperCase()}</span></div>
    <div class="tp-pd-hero">
      <div class="tp-pd-num" style="color:${teamColor}">${p.n || '—'}</div>
      <div class="tp-pd-photo-wrap">
        ${photoHtml}
        <div class="tp-pd-role-badge">${(p.role || '').toUpperCase()}</div>
      </div>
    </div>
    <div class="tp-pd-name">${cleanName}</div>
    <div class="tp-pd-pos-club"><span style="color:${teamColor}">${p.pos}</span> · ${p.club || '—'}</div>

    <div class="tp-pd-cards-wrap">
      <div class="tp-stat-card">
        <div class="tp-stat-card-title">🌐 Sélection Nationale</div>
        <div class="tp-stat-card-grid">
          <div class="tp-sc-stat"><span class="tp-sc-v">${p.caps ?? '—'}</span><span class="tp-sc-l">Sélections</span></div>
          <div class="tp-sc-stat"><span class="tp-sc-v">${p.goals ?? '—'}</span><span class="tp-sc-l">Buts</span></div>
          <div class="tp-sc-stat"><span class="tp-sc-v">${p.ast ?? '—'}</span><span class="tp-sc-l">Passes D.</span></div>
          <div class="tp-sc-stat"><span class="tp-sc-v" style="color:#fbbf24">${wcGoals}</span><span class="tp-sc-l">Buts CM</span></div>
        </div>
        <div class="tp-stat-card-deets">
          ${p.debut ? `<div class="tp-scd"><span>1ère sél.</span><span>${p.debut}</span></div>` : ''}
          ${p.born  ? `<div class="tp-scd"><span>Né le</span><span>${p.born}</span></div>` : ''}
          ${p.h     ? `<div class="tp-scd"><span>Taille</span><span>${p.h}</span></div>` : ''}
        </div>
      </div>

      <div class="tp-stat-card">
        <div class="tp-stat-card-title">🏟 En Club</div>
        <div class="tp-stat-card-grid">
          <div class="tp-sc-stat"><span class="tp-sc-v">${p.age ?? '—'}</span><span class="tp-sc-l">Âge</span></div>
          <div class="tp-sc-stat"><span class="tp-sc-v">${posShort(p.pos)}</span><span class="tp-sc-l">Poste</span></div>
          <div class="tp-sc-stat tp-sc-wide"><span class="tp-sc-v tp-sc-club">${p.club || '—'}</span><span class="tp-sc-l">Club actuel</span></div>
        </div>
        ${p.career && p.career.length ? `
        <div class="tp-career-table">
          <table>
            <thead><tr><th>Club</th><th>Saisons</th><th>M</th><th>B</th><th>PD</th><th>🟨</th><th>🟥</th></tr></thead>
            <tbody>${p.career.map(c => `<tr>
                <td class="tp-ct-club">${c.club}</td>
                <td class="tp-ct-years">${c.from}–${c.to !== null && c.to !== undefined ? c.to : '...'}</td>
                <td>${c.apps ?? '—'}</td>
                <td>${c.goals ?? '—'}</td>
                <td>${c.ast ?? '—'}</td>
                <td>${c.yc ?? '—'}</td>
                <td>${c.rc ?? '—'}</td>
              </tr>`).join('')}</tbody>
          </table>
        </div>` : (p.bio ? `<div class="tp-stat-card-bio">${p.bio}</div>` : '')}
      </div>
    </div>`;
}

// ── PLAYER PHOTO FALLBACK ─────────────────────────────────────────────
function playerPhotoFallback(imgElement, teamColor, playerName) {
  const initials = getPlayerInitials(playerName);
  const parent = imgElement.parentElement;
  if (!parent) return;
  
  const isDetail = imgElement.classList.contains('player-detail-photo');
  const avatarClass = isDetail ? 'player-detail-avatar' : 'player-card-avatar';
  
  let html = `<div class="${avatarClass}" style="background:${teamColor}">${initials}</div>`;
  if (isDetail) {
    // For detail view, we also need to restore the number which might have been hidden/lost
    const n = imgElement.getAttribute('data-number') || '';
    html += `<div class="player-detail-number">${n}</div>`;
  }
  
  parent.innerHTML = html;
}

// Strip Wikipedia bracket notation: [[Name (footballer, ...)]] → Name
function cleanPlayerName(name) {
  if (!name) return '';
  return name
    .replace(/\[\[/g, '')
    .replace(/\]\]/g, '')
    .replace(/\s*\([^)]*\)/g, '')
    .trim();
}

function getPlayerInitials(name) {
  const clean = cleanPlayerName(name);
  const parts = clean.replace(/['']/g, '').split(' ').filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return (parts[0] || 'XX').slice(0, 2).toUpperCase();
}

const TEAM_COLORS = {
  'France':'#002395','Espagne':'#c60b1e','Argentine':'#43a1d5','Brésil':'#009c3b',
  'Portugal':'#006600','Angleterre':'#ffffff','Allemagne':'#000000','Pays-Bas':'#f36c21',
  'Belgique':'#e30613','Maroc':'#c1272d','Japon':'#bc002d','Colombie':'#fcd116',
  'Uruguay':'#0038a8','Mexique':'#006847','Corée du Sud':'#ce1126','Afrique du Sud':'#007a4d',
  'Canada':'#ff0000','Suisse':'#ff0000','Qatar':'#8d1b3d','Serbie':'#c6363c',
  'Croatie':'#cc0000','Australie':'#00843d','Slovaquie':'#0b4ea2',"Côte d'Ivoire":'#f77f00',
  'Curaçao':'#003da5','Tunisie':'#e70013','Pérou':'#d91023','Sénégal':'#00853f',
  'Égypte':'#ce1126','Iran':'#239f40','Nouvelle-Zélande':'#00247d','Arabie saoudite':'#006c35',
  'Algérie':'#006233','Autriche':'#ed2939','Jordanie':'#007a3d','Cameroun':'#007a5e',
  'Ouzbékistan':'#1eb53a','Ghana':'#006b3f','Panamá':'#005293','Slovénie':'#003da5',
  'Écosse':'#002B7F','Équateur':'#ffd100','Paraguay':'#d52b1e','Norvège':'#ef2b2d',
  'Cap-Vert':'#003893','États-Unis':'#3c3b6e','Angleterre':'#ffffff',
};
// Coach photos — sofascore manager endpoint (fallback to initials if 404)
const COACH_PHOTOS = {
  'Didier Deschamps':   'https://img.sofascore.com/api/v1/manager/73009/image',
  'Luis de la Fuente':  'https://img.sofascore.com/api/v1/manager/12073/image',
  'Lionel Scaloni':     'https://img.sofascore.com/api/v1/manager/35534/image',
  'Dorival Júnior':     'https://img.sofascore.com/api/v1/manager/10462/image',
  'Roberto Martínez':   'https://img.sofascore.com/api/v1/manager/14920/image',
  'Gareth Southgate':   'https://img.sofascore.com/api/v1/manager/14956/image',
  'Julian Nagelsmann':  'https://img.sofascore.com/api/v1/manager/749783/image',
  'Ronald Koeman':      'https://img.sofascore.com/api/v1/manager/13966/image',
  'Domenico Tedesco':   'https://img.sofascore.com/api/v1/manager/793094/image',
  'Walid Regragui':     'https://img.sofascore.com/api/v1/manager/12100/image',
  'Hajime Moriyasu':    'https://img.sofascore.com/api/v1/manager/70490/image',
  'Néstor Lorenzo':     'https://img.sofascore.com/api/v1/manager/801614/image',
  'Marcelo Bielsa':     'https://img.sofascore.com/api/v1/manager/9219/image',
  'Gregg Berhalter':    'https://img.sofascore.com/api/v1/manager/72698/image',
  'Javier Aguirre':     'https://img.sofascore.com/api/v1/manager/10058/image',
  'Hugo Broos':         'https://img.sofascore.com/api/v1/manager/12094/image',
  'Hong Myung-bo':      'https://img.sofascore.com/api/v1/manager/14963/image',
  'Ivan Hasek':         'https://img.sofascore.com/api/v1/manager/35574/image',
};

function getTeamColor(teamName) {
  // TEAM_COLORS has priority — td.color can be a generic #333333 fallback
  if (TEAM_COLORS[teamName]) return TEAM_COLORS[teamName];
  const td = getTeamData(teamName);
  if (td && td.color && td.color !== '#333333') return td.color.startsWith('#') ? td.color : '#' + td.color;
  return '#2a3a6e';
}

function getTeamRank(teamName) {
  for (const g of GROUPS) {
    const t = g.teams.find(t => t.name === teamName);
    if (t && t.rank) return t.rank;
  }
  return null;
}

// NOTE: renommé pour éviter la collision avec la fonction playerPhotoFallback(imgElement, teamColor, playerName)
// qui manipule le DOM (utilisée par les onerror inline dans renderPlayerCard).
function getPlayerFallbackUrl(name, teamName) {
  const color = getTeamColor(teamName).replace('#', '');
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=${color}&textColor=ffffff&fontSize=40&fontWeight=700`;
}

function onImgError(img, name, teamName) {
  const fallback = getPlayerFallbackUrl(name, teamName);
  if (img.src !== fallback) {
    img.src = fallback;
  }
}

// ── RENDER PLAYER CARD ────────────────────────────────────────────────
function renderPlayerCard(p, teamName) {
  const td = getTeamData(teamName);
  const teamColor = (td && td.color) ? ('#' + td.color.replace('#', '')) : '#6366f1';
  const isDicebear = p.photo && p.photo.includes('dicebear');
  const isRealPhoto = p.photo && !isDicebear;
  const initials = getPlayerInitials(p.name);
  const fallbackUrl = getPlayerFallbackUrl(p.name, teamName);

  // For real photos: use <img>. For avatars: render CSS initials div.
  const photoHtml = isRealPhoto
    ? `<img class="player-card-photo" src="${p.photo}" alt="${p.name}" loading="lazy"
        onerror="playerPhotoFallback(this, '${teamColor}', '${p.name.replace(/'/g, "\\'")}')">`
    : `<div class="player-card-avatar" style="background:${teamColor}">${initials}</div>`;

  return `
  <div class="player-card" onclick="openPlayerPanel('${teamName.replace(/'/g, "\'")}','${p.id}')">
    <div class="player-card-number">${p.n}</div>
    <div class="player-card-photo-wrap">
      ${photoHtml}
    </div>
    <div class="player-card-gradient"></div>
    <div class="player-card-info">
      <div class="player-card-name">${cleanPlayerName(p.name).split(' ').pop()}</div>
      <div class="player-card-pos-row">
        <span class="pos-badge ${posClass(p.pos)}">${posShort(p.pos)}</span>
        <span class="player-card-age">${p.age} ans</span>
      </div>
    </div>
    <div class="player-card-stats">
      <div class="player-stat"><span class="stat-val">${p.caps}</span><span class="stat-lbl">Caps</span></div>
      <div class="player-stat"><span class="stat-val">${p.goals}</span><span class="stat-lbl">Buts</span></div>
      <div class="player-stat"><span class="stat-val">${p.ast}</span><span class="stat-lbl">Passes</span></div>
    </div>
  </div>`;
}

// ── OPEN PLAYER PANEL ─────────────────────────────────────────────────
function openPlayerPanel(teamName, playerId) {
  const td = getTeamData(teamName);
  if (!td) return;
  const p = td.players.find(pl => pl.id === playerId);
  if (!p) return;
  const teamColor = (td && td.color) ? ('#' + td.color.replace('#', '')) : '#6366f1';
  const isDicebear = p.photo && p.photo.includes('dicebear');
  const isRealPhoto = p.photo && !isDicebear;
  const initials = getPlayerInitials(p.name);

  // Compute impact score
  const pos = p.pos;
  let impactScore = 50;
  if (p.caps > 0) {
    if (pos === 'Gardien')   impactScore = Math.min(99, Math.round(p.caps * 1.5 + (p.goals===0?10:0)));
    if (pos === 'Défenseur') impactScore = Math.min(99, Math.round(p.caps * 1.2 + p.goals * 4 + p.ast * 2));
    if (pos === 'Milieu')    impactScore = Math.min(99, Math.round(p.caps + p.goals * 5 + p.ast * 5));
    if (pos === 'Attaquant') impactScore = Math.min(99, Math.round(p.goals * 6 + p.ast * 3 + p.caps * 0.5));
  }
  const impactLabel = impactScore >= 80 ? '⭐ Élite' : impactScore >= 60 ? '🔵 Confirmé' : impactScore >= 40 ? '🟡 Prometteur' : '⚪ En devenir';
  const capsPerYear = (() => {
    const yr = parseInt((p.debut||'').split('/')[2]||'2020');
    return (p.caps / Math.max(1, 2026 - yr)).toFixed(1);
  })();
  const gPerM = p.caps > 0 ? (p.goals / p.caps).toFixed(2) : '—';
  const aPerM = p.caps > 0 ? (p.ast / p.caps).toFixed(2) : '—';
  const cPerM = p.caps > 0 ? ((p.goals + p.ast) / p.caps).toFixed(2) : '—';

  // WC 2026 stats from live scorers
  const shortName = cleanPlayerName(p.name).split(' ').pop();
  let wc26goals = 0, wc26assists = 0;
  Object.values(state.scorers || {}).forEach(({ home=[], away=[], homeAssists=[], awayAssists=[] }) => {
    [...home,...away].forEach(n => { if(n&&(n.includes(shortName)||shortName.includes(n.split(' ').pop()))) wc26goals++; });
    [...homeAssists,...awayAssists].forEach(n => { if(n&&(n.includes(shortName)||shortName.includes(n.split(' ').pop()))) wc26assists++; });
  });
  const wc26html = (wc26goals > 0 || wc26assists > 0) ? `
    <div class="pp-wc26">
      <div class="pp-wc26-title">⚽ WC 2026</div>
      <div class="pp-wc26-stats">
        <span class="pp-wc26-val goals">${wc26goals} but${wc26goals>1?'s':''}</span>
        ${wc26assists>0?`<span class="pp-wc26-val ast">${wc26assists} passe${wc26assists>1?'s':''} D.</span>`:''}
      </div>
    </div>` : '';

  const heroHtml = isRealPhoto
    ? `<img class="pp-hero-img" src="${p.photo}" alt="${p.name}" loading="lazy"
        onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
    : '';
  const avatarHtml = `<div class="pp-hero-avatar" style="${isRealPhoto ? 'display:none;' : ''}background:${teamColor}">${initials}</div>`;

  const html = `
    <div class="pp-noscroll" style="--tc:${teamColor}">
      <div class="pp-top-bar">
        <button class="pp-back" onclick="openTeamPanel('${teamName.replace(/'/g, "\\'")}')">← ${teamName}</button>
        <span class="pp-name">${p.name}</span>
        <span class="pp-num">#${p.n}</span>
      </div>
      <div class="pp-hero">
        ${heroHtml}${avatarHtml}
        <div class="pp-hero-overlay">
          <span class="pos-badge ${posClass(p.pos)}">${p.pos}</span>
          <span class="player-detail-role ${p.role === 'Titulaire' ? 'role-starter' : 'role-sub'}" style="font-size:0.7rem;padding:3px 8px">${p.role}</span>
          <span class="pp-hero-club">${p.club}</span>
        </div>
      </div>
      <div class="pp-stats-area">
        <div class="pp-stat-grid">
          <div class="pp-stat-box"><div class="pp-sv">${p.caps}</div><div class="pp-sl">Sélect.</div></div>
          <div class="pp-stat-box"><div class="pp-sv">${p.goals}</div><div class="pp-sl">Buts</div></div>
          <div class="pp-stat-box"><div class="pp-sv">${p.ast}</div><div class="pp-sl">Passes</div></div>
          <div class="pp-stat-box"><div class="pp-sv">${p.age}</div><div class="pp-sl">Âge</div></div>
          <div class="pp-stat-box"><div class="pp-sv">${p.goals + p.ast}</div><div class="pp-sl">Contrib.</div></div>
          <div class="pp-stat-box"><div class="pp-sv">${capsPerYear}</div><div class="pp-sl">Caps/an</div></div>
        </div>
        <div class="pp-impact">
          <div class="pp-impact-labels">
            <span>Score d'impact</span>
            <span>${impactLabel} · ${impactScore}/99</span>
          </div>
          <div class="pp-impact-track">
            <div class="pp-impact-fill" style="width:${impactScore}%"></div>
          </div>
        </div>
        <div class="pp-info-chips">
          <span class="pp-chip">🎂 ${p.born}</span>
          <span class="pp-chip">📏 ${p.h}</span>
          <span class="pp-chip">🏟 1ère sél. ${p.debut}</span>
          <span class="pp-chip">${p.pos === 'Gardien' ? '🥅' : p.pos === 'Défenseur' ? '🛡' : p.pos === 'Milieu' ? '⚡' : '⚽'} ${p.pos}</span>
        </div>
        ${wc26html}
        <div class="pp-bio">${p.bio}</div>
        ${p.caps > 0 ? `
        <div class="pp-ratios">
          <div class="pp-ratio-row">
            <span class="pp-ratio-label">Buts / match</span>
            <div class="pp-ratio-bar"><div class="pp-ratio-fill" style="width:${Math.min(100,(p.goals/p.caps)*100*3)}%"></div></div>
            <span class="pp-ratio-val">${gPerM}</span>
          </div>
          <div class="pp-ratio-row">
            <span class="pp-ratio-label">Passes / match</span>
            <div class="pp-ratio-bar"><div class="pp-ratio-fill ast" style="width:${Math.min(100,(p.ast/p.caps)*100*3)}%"></div></div>
            <span class="pp-ratio-val">${aPerM}</span>
          </div>
          <div class="pp-ratio-row">
            <span class="pp-ratio-label">Contrib. / match</span>
            <div class="pp-ratio-bar"><div class="pp-ratio-fill contrib" style="width:${Math.min(100,((p.goals+p.ast)/p.caps)*100*2)}%"></div></div>
            <span class="pp-ratio-val">${cPerM}</span>
          </div>
        </div>` : ''}
      </div>
    </div>`;

  // Flip animation: if panel already open → flip in place; else open fresh
  const body = document.getElementById('panel-body');
  const drawer = document.getElementById('panel-drawer');
  const titleEl = document.getElementById('panel-title');
  const panelOpen = document.getElementById('side-panel')?.classList.contains('open');

  if (panelOpen && body) {
    body.style.transition = 'transform 0.18s ease-in, opacity 0.18s ease-in';
    body.style.transformOrigin = 'right center';
    body.style.transform = 'perspective(700px) rotateY(-80deg)';
    body.style.opacity = '0';
    setTimeout(() => {
      body.innerHTML = html;
      if (titleEl) titleEl.textContent = p.name;
      body.style.transition = 'none';
      body.style.transform = 'perspective(700px) rotateY(80deg)';
      body.style.opacity = '0';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        body.style.transition = 'transform 0.22s ease-out, opacity 0.22s ease-out';
        body.style.transform = 'perspective(700px) rotateY(0deg)';
        body.style.opacity = '1';
      }));
    }, 185);
  } else {
    openPanel(html, p.name);
  }
}

// ── RENDER CALENDAR ───────────────────────────────────────────────────
// Carte match épurée mobile : drapeaux + équipes + score, rien d'autre
function renderMatchRowMobile(g, m, i) {
  const key = g.id + '_' + i;
  const score = state.scores[key] || m.s;
  const status = matchLiveStatus(m);
  const li = state.liveInfo[key];
  const hInfo = g.teams.find(t => t.name === m.h);
  const aInfo = g.teams.find(t => t.name === m.a);
  const flagEl = (info) => {
    const src = getFlagImg(info?.code);
    return src
      ? `<img class="mr-flag-img" src="${src}" alt="" loading="lazy">`
      : `<span class="mr-flag-emoji">${info?.flag || '🏳️'}</span>`;
  };
  const scoreDisp = (score || '').replace('-', ' – ');
  let mid;
  if (status === 'live') {
    mid = `<div class="mr-score mr-live">${scoreDisp || '0 – 0'}</div>
           <div class="mr-status mr-status-live"><span class="mc-live-dot"></span>LIVE${li?.clock ? ' · ' + li.clock : ''}</div>`;
  } else if (score) {
    mid = `<div class="mr-score">${scoreDisp}</div><div class="mr-status">Terminé</div>`;
  } else {
    mid = `<div class="mr-time">${m.t}</div><div class="mr-status">Groupe ${g.id}</div>`;
  }
  return `
  <div class="mr-card ${status === 'live' ? 'mr-card-live' : ''}" onclick="gpMatchClick('${g.id}',${i})">
    <div class="mr-team">${flagEl(hInfo)}<span class="mr-name">${m.h}</span></div>
    <div class="mr-mid">${mid}</div>
    <div class="mr-team">${flagEl(aInfo)}<span class="mr-name">${m.a}</span></div>
  </div>`;
}

function renderCalendar() {
  const container = document.getElementById('calendar-matches');
  if (!container) return;

  // ── Rail de dates vertical (mobile ET desktop) ──
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  const now = new Date();
  const todayStr = `${now.getDate()} ${['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'][now.getMonth()]}`;
  const dateMin = {};
  GROUPS.forEach(g => g.matches.forEach(m => {
    const t = m.utc ? new Date(m.utc).getTime() : 0;
    if (!(m.d in dateMin) || t < dateMin[m.d]) dateMin[m.d] = t;
  }));
  const dates = Object.keys(dateMin).sort((a, b) => dateMin[a] - dateMin[b]);
  const active = (window._calDate && dates.includes(window._calDate)) ? window._calDate
    : (dates.includes(todayStr) ? todayStr : dates[0]);

  const railHtml = dates.map(d => {
    const [day, mon] = d.split(' ');
    return `<button class="ld-chip ${d === active ? 'active' : ''} ${d === todayStr ? 'today' : ''}"
      onclick="calSelectDate('${d}')"><b>${day}</b><span>${(mon || '').slice(0, 3)}</span></button>`;
  }).join('');

  const dayMatches = [];
  GROUPS.forEach(g => g.matches.forEach((m, i) => { if (m.d === active) dayMatches.push({ g, m, i }); }));
  dayMatches.sort((a, b) => new Date(a.m.utc || 0) - new Date(b.m.utc || 0));

  const prevRail = document.getElementById('cal-rail');
  const prevScroll = prevRail ? prevRail.scrollTop : null;

  let dayInner;
  if (!dayMatches.length) {
    dayInner = `<div class="live-hero"><div class="live-hero-icon">📅</div><div class="live-hero-title">Pas de match ce jour</div></div>`;
  } else if (isMobile) {
    dayInner = `<div class="mr-list">${dayMatches.map(x => renderMatchRowMobile(x.g, x.m, x.i)).join('')}</div>`;
  } else {
    dayInner = `<div class="calendar-matches">${dayMatches.map(x => renderMatchCard(x.g, x.m, x.i)).join('')}</div>`;
  }

  container.innerHTML = `
    <div class="live-timeline${isMobile ? '' : ' cal-desktop-timeline'}">
      <div class="live-rail" id="cal-rail">${railHtml}</div>
      <div class="live-day-content">
        <div class="cal-day-label">${active} 2026</div>
        ${dayInner}
      </div>
    </div>`;

  const rail = document.getElementById('cal-rail');
  if (rail) {
    if (prevScroll !== null) rail.scrollTop = prevScroll;
    else {
      const act = rail.querySelector('.ld-chip.active');
      if (act) rail.scrollTop = Math.max(act.offsetTop - rail.clientHeight / 2 + 28, 0);
    }
  }
}

function renderMatchCard(g, m, i) {
  const scoreKey   = g.id + '_' + i;
  const score      = state.scores[scoreKey];
  const scorers    = state.scorers[scoreKey] || { home: [], away: [] };
  const meta       = state.goalMeta[scoreKey] || {};
  const liveStatus = matchLiveStatus(m);
  const isLive     = liveStatus === 'live';

  const hColor = getTeamColor(m.h);
  const aColor = getTeamColor(m.a);

  // Parse score digits — default 0–0 before match starts
  let hGoals = '0', aGoals = '0';
  if (score) {
    const parts = score.split('-');
    hGoals = parts[0]?.trim() || '0';
    aGoals = parts[1]?.trim() || '0';
  }

  // Animation: glow on digit changed within last 5s
  const now = Date.now();
  const animActive = meta.changedAt && (now - meta.changedAt < 5000);
  const hAnim = animActive && meta.lastTeam === 'home' ? 'mc-goal-anim' : '';
  const aAnim = animActive && meta.lastTeam === 'away' ? 'mc-goal-anim' : '';

  const _isAdmin = (localStorage.getItem('wc2026_pseudo') || '') === '_admin_';
  const editBtn = _isAdmin
    ? `<button class="mc-edit-btn" onclick="event.stopPropagation();promptScore('${g.id}',${i},'${m.h.replace(/'/g,"\\'")}','${m.a.replace(/'/g,"\\'")}')">✏️</button>`
    : '';

  const _mcDet = state.matchDetails[scoreKey] || {};
  const _mcCards = (side) => [
    ...(_mcDet.yellows?.[side] || []).map(n => `<span class="mc-scorer-name">🟨 ${n}</span>`),
    ...(_mcDet.reds?.[side]    || []).map(n => `<span class="mc-scorer-name">🟥 ${n}</span>`),
  ].join('');
  const hScorersList = (scorers.home.length ? scorers.home.map(s=>`<span class="mc-scorer-name">⚽ ${s}</span>`).join('') : '') + _mcCards('home');
  const aScorersList = (scorers.away.length ? scorers.away.map(s=>`<span class="mc-scorer-name">⚽ ${s}</span>`).join('') : '') + _mcCards('away');

  const _mcClock = (state.liveInfo[scoreKey]?.clock || '').trim();
  const liveBadge = isLive ? `<div class="mc-live-badge"><span class="mc-live-dot"></span>LIVE${_mcClock ? ` · ${_mcClock}` : ''}</div>` : '';
  const hInfo = g.teams.find(t => t.name === m.h);
  const aInfo = g.teams.find(t => t.name === m.a);
  const hFlag = hInfo?.flag || '🏳️';
  const aFlag = aInfo?.flag || '🏳️';
  const hFlagSrc = getFlagImg(hInfo?.code);
  const aFlagSrc = getFlagImg(aInfo?.code);
  const hBadge = hFlagSrc
    ? `<img src="${hFlagSrc}" class="mc-syn-flag-img" alt="${m.h}">`
    : `<span class="mc-syn-flag">${hFlag}</span>`;
  const aBadge = aFlagSrc
    ? `<img src="${aFlagSrc}" class="mc-syn-flag-img" alt="${m.a}">`
    : `<span class="mc-syn-flag">${aFlag}</span>`;
  const synBanner = `
    <div class="mc-syn-banner">
      <div class="mc-syn-home" style="--tc:${hColor}"></div>
      <div class="mc-syn-away" style="--tc:${aColor}"></div>
      <div class="mc-syn-overlay">
        <div class="mc-syn-team">
          <div class="mc-syn-badge">${hBadge}</div>
          <div class="mc-syn-teamname">${m.h}</div>
        </div>
        <div class="mc-syn-center">
          <span class="mc-syn-label">COUPE DU MONDE</span>
          <span class="mc-syn-title">★ 2026 USA ★</span>
        </div>
        <div class="mc-syn-team">
          <div class="mc-syn-badge">${aBadge}</div>
          <div class="mc-syn-teamname">${m.a}</div>
        </div>
      </div>
    </div>`;

  // ── BACK face: confrontation poster + official starters ─────────────
  const confrontImg = getConfrontationImg(m.h, m.a);

  const frontCard = `
    <div class="mc-flip-front match-card mc2 has-confront ${score ? 'has-result' : ''} ${isLive ? 'is-live' : ''}" onclick="openMatchPitchPanel('${g.id}',${i})">
      ${liveBadge}
      ${synBanner}
      <div class="mc-body">
        <div class="mc-score-inline">
          <div class="mc-scorers-left">${hScorersList}</div>
          <div class="mc-score-center">
            <span class="mc-digit home ${hAnim}" style="color:${hColor}">${hGoals}</span>
            <span class="mc-score-sep">–</span>
            <span class="mc-digit away ${aAnim}" style="color:${aColor}">${aGoals}</span>
          </div>
          <div class="mc-scorers-right">${aScorersList}</div>
        </div>
      </div>
      <div class="mc-venue">${m.v}</div>
    </div>`;

  const backCard = `
    <div class="mc-flip-back" onclick="event.stopPropagation()">
      <div class="mc-back-split">
        <div class="mc-back-poster-pane">
          ${confrontImg ? `<img class="mc-back-poster-img" src="${confrontImg}" alt="${m.h} vs ${m.a}" onerror="this.style.display='none';this.closest('.mc-back-poster-pane').querySelector('.mc-back-poster-fallback').style.display='flex'">` : ''}
          <div class="mc-back-poster-fallback" style="--hc:${hColor};--ac:${aColor};display:${confrontImg ? 'none' : 'flex'}"><span>${hFlag}</span><strong>VS</strong><span>${aFlag}</span></div>
          <div class="mc-back-poster-shade"></div>
        </div>
        <div class="mc-back-lineups-pane">
          <div class="mc-back-lineups-heading">
            <span>XI titulaires officiels</span>
            <strong>${hGoals} - ${aGoals}</strong>
          </div>
          <div class="mc-back-lineups-grid">
            ${renderCalendarLineup(m.h, hFlag, hColor)}
            ${renderCalendarLineup(m.a, aFlag, aColor)}
          </div>
        </div>
      </div>
    </div>`;

  // ── CTA : vidéo (à gauche) + Voir Live / Résultat ──
  const _played = liveStatus === 'finished' || (!!score && !isLive);
  const _videoBtn = isMatchVideoReady(m)
    ? `<a class="mc-video-cta-btn" href="${getMatchVideoUrl(scoreKey, m)}" target="_blank" rel="noopener" onclick="event.stopPropagation()"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>Vidéo</a>`
    : '';
  const _mainBtn = _played
    ? `<button class="mc-result-cta-btn" onclick="event.stopPropagation();openMatchPitchPanel('${g.id}',${i})">Résultat</button>`
    : `<button class="mc-live-cta-btn" onclick="event.stopPropagation();switchView('live')"><span class="mc-live-cta-dot"></span>Voir Live</button>`;
  const liveBtn = `<div class="mc-prono-cta-wrap">${_videoBtn}${_mainBtn}</div>`;
  const staticHeader = `<div class="mc-static-header"><span class="mc-date">${m.d} · ${m.t}</span><div class="mc-header-cta">${_isAdmin ? editBtn : ''}${liveBtn}</div></div>`;
  return `<div class="mc-card-outer">${staticHeader}<div class="mc-flip-wrapper">${frontCard}${backCard}</div></div>`;
}

function liveUpdateGroupScore(scoreKey) {
  const el = document.querySelector(`.gp-am-vscore[data-scorekey="${scoreKey}"]`);
  if (!el) return;
  const score = state.scores[scoreKey];
  if (score) {
    el.textContent = score;
    el.classList.add('has-score');
    el.closest('.gp-apple-match')?.classList.add('played');
  } else {
    el.textContent = '0-0';
    el.classList.remove('has-score');
    el.closest('.gp-apple-match')?.classList.remove('played');
  }
}

function promptScore(groupId, matchIdx, home, away) {
  const scoreKey  = groupId + '_' + matchIdx;
  const oldScore  = state.scores[scoreKey] || '';
  const input = prompt(`Score — ${home} vs ${away}\nFormat: 2-1`, oldScore);
  if (input === null) return;

  if (input.trim() === '') {
    delete state.scores[scoreKey];
    delete state.scorers[scoreKey];
    delete state.goalMeta[scoreKey];
  } else {
    const newScore = input.trim();
    state.scores[scoreKey] = newScore;

    // Detect which team scored last (compare with old score)
    const oldParts = oldScore.split('-').map(s => parseInt(s) || 0);
    const newParts = newScore.split('-').map(s => parseInt(s) || 0);
    let lastTeam = null;
    if (newParts[0] > oldParts[0]) lastTeam = 'home';
    else if (newParts[1] > oldParts[1]) lastTeam = 'away';

    if (lastTeam) {
      state.goalMeta[scoreKey] = { changedAt: Date.now(), lastTeam };
      // Schedule re-render after 5s to remove animation
      setTimeout(() => { renderCalendar(); }, 5100);
    }

    // Ask for goal scorer
    if (lastTeam) {
      const scorerName = prompt(`⚽ Nom du buteur (${lastTeam === 'home' ? home : away}) — optionnel`, '');
      if (scorerName && scorerName.trim()) {
        if (!state.scorers[scoreKey]) state.scorers[scoreKey] = { home: [], away: [] };
        state.scorers[scoreKey][lastTeam].push(scorerName.trim());
      }
    }
  }
  saveScores();
  liveUpdateGroupScore(scoreKey);
  renderCalendar();
  renderGroups();
  renderKnockout();
}

// ── RENDER STATS ──────────────────────────────────────────────────────
// ── LIVE VIEW ─────────────────────────────────────────────────────────
function goToCompare(team1, team2) {
  switchView('comparison');
  requestAnimationFrame(() => {
    renderComparison(team1, team2);
  });
}

function renderLiveView() {
  const container = document.getElementById('live-content');
  if (!container) return;

  const now = new Date();
  const todayStr = `${now.getDate()} ${['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'][now.getMonth()]}`;

  // Collect all matches for today
  const todayMatches = [];
  GROUPS.forEach(g => {
    g.matches.forEach((m, i) => {
      if (m.d === todayStr) {
        todayMatches.push({ g, m, i });
      }
    });
  });

  // Matchs futurs (hors aujourd'hui), triés chronologiquement
  const allFuture = [];
  GROUPS.forEach(g => g.matches.forEach((m, i) => {
    if (m.d === todayStr) return;
    let matchDate;
    if (m.utc) {
      matchDate = new Date(m.utc);
    } else {
      const parts = m.d.split(' ');
      const day = parseInt(parts[0]);
      const month = MONTHS_FR[parts[1]] ?? 5;
      const [h, min] = m.t.split(':').map(Number);
      matchDate = new Date(2026, month, day, h, min);
    }
    if (matchDate > now) allFuture.push({ g, m, i, matchDate });
  }));
  allFuture.sort((a, b) => a.matchDate - b.matchDate);
  const nextDate = allFuture[0]?.m.d || '';
  const nextMatches = allFuture.filter(x => x.m.d === nextDate);

  // ── Onglets Hier / Aujourd'hui / À venir ──
  const MONTHS_ARR = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
  const yd = new Date(now.getTime() - 86400000);
  const yStr = `${yd.getDate()} ${MONTHS_ARR[yd.getMonth()]}`;
  const yesterdayMatches = [];
  GROUPS.forEach(g => g.matches.forEach((m, i) => { if (m.d === yStr) yesterdayMatches.push({ g, m, i }); }));

  const tab = window._liveTab || 'today';
  const tabsHtml = `
    <div class="live-day-tabs">
      <button class="live-day-tab ${tab === 'yesterday' ? 'active' : ''}" onclick="setLiveTab('yesterday')">Hier</button>
      <button class="live-day-tab ${tab === 'today' ? 'active' : ''}" onclick="setLiveTab('today')">Aujourd'hui</button>
      <button class="live-day-tab ${tab === 'future' ? 'active' : ''}" onclick="setLiveTab('future')">À venir</button>
    </div>`;

  const liveCount = todayMatches.filter(x => matchLiveStatus(x.m) === 'live').length;
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  // Mobile : cartes épurées (mêmes que l'onglet Matchs), section = label + liste
  const card = isMobile ? renderMatchRowMobile : renderLiveCard;
  const list = (items) => isMobile
    ? `<div class="mr-list">${items.map(x => card(x.g, x.m, x.i)).join('')}</div>`
    : `<div class="live-cards">${items.map(x => card(x.g, x.m, x.i)).join('')}</div>`;
  const label = (txt, cls = '') => `<div class="live-section-label ${cls}">${txt}</div>`;
  const empty = (ico, title, sub = '') =>
    `<div class="live-hero"><div class="live-hero-icon">${ico}</div><div class="live-hero-title">${title}</div>${sub ? `<div class="live-hero-sub">${sub}</div>` : ''}</div>`;

  let body = '';
  if (tab === 'yesterday') {
    body = yesterdayMatches.length
      ? label(`${yStr}`) + list(yesterdayMatches)
      : empty('📅', 'Pas de match hier');
  } else if (tab === 'future') {
    const dates = [...new Set(allFuture.map(x => x.m.d))].slice(0, 3);
    body = dates.length
      ? dates.map(d => label(`${d}`) + list(allFuture.filter(x => x.m.d === d))).join('')
      : empty('🏁', 'Plus de match à venir');
  } else {
    const liveNow    = todayMatches.filter(x => matchLiveStatus(x.m) === 'live');
    const upcoming   = todayMatches.filter(x => matchLiveStatus(x.m) === 'upcoming');
    const finished   = todayMatches.filter(x => matchLiveStatus(x.m) === 'finished');
    body = todayMatches.length ? `
      ${liveNow.length  ? label('En direct', 'live-label-red') + list(liveNow) : ''}
      ${upcoming.length ? label("À venir aujourd'hui") + list(upcoming) : ''}
      ${finished.length ? label('Terminés') + list(finished) : ''}`
      : empty('📅', "Pas de match aujourd'hui", `Prochain match : <strong>${nextDate || '—'}</strong>`);
  }

  container.innerHTML = `
    <div class="live-page-header">
      <div class="live-page-date">${todayStr} 2026</div>
      <div class="live-page-badge"><span class="mc-live-dot"></span>${liveCount} EN DIRECT</div>
    </div>
    ${tabsHtml}
    ${body}`;
}

function setLiveTab(t) { window._liveTab = t; renderLiveView(); }
function calSelectDate(d) {
  window._calDate = d;
  renderCalendar();
}

function pseudoHue(p) {
  let h = 0;
  for (let c of p) h = (h * 31 + c.charCodeAt(0)) & 0xffff;
  return h % 360;
}

function renderLiveCard(g, m, i) {
  const scoreKey   = g.id + '_' + i;
  const score      = state.scores[scoreKey];
  const scorers    = state.scorers[scoreKey] || { home: [], away: [] };
  const meta       = state.goalMeta[scoreKey] || {};
  const liveStatus = matchLiveStatus(m);
  const isLive     = liveStatus === 'live';

  const hTeam  = GROUPS.flatMap(gr => gr.teams).find(t => t.name === m.h);
  const aTeam  = GROUPS.flatMap(gr => gr.teams).find(t => t.name === m.a);
  const hColor = getTeamColor(m.h);
  const aColor = getTeamColor(m.a);

  let hGoals = '—', aGoals = '—';
  if (score) { const p = score.split('-'); hGoals = p[0]?.trim(); aGoals = p[1]?.trim(); }

  const nowMs = Date.now();
  const animActive = meta.changedAt && (nowMs - meta.changedAt < 5000);
  const hAnim = animActive && meta.lastTeam === 'home' ? 'mc-goal-anim' : '';
  const aAnim = animActive && meta.lastTeam === 'away' ? 'mc-goal-anim' : '';

  const det = state.matchDetails[scoreKey] || {};
  // une ligne par événement : icône + minute + nom (même lisibilité que le résumé)
  const sideEvents = (side) => [
    ...(scorers[side] || []).map(n => `<div class="lc-ev">⚽ ${n}</div>`),
    ...(det.yellows?.[side] || []).map(n => `<div class="lc-ev">🟨 ${n}</div>`),
    ...(det.reds?.[side] || []).map(n => `<div class="lc-ev">🟥 ${n}</div>`),
  ].join('');
  const hScorers = sideEvents('home');
  const aScorers = sideEvents('away');
  const liveClock = (state.liveInfo[scoreKey]?.clock || '').trim();

  // Admin check
  const currentPseudo = localStorage.getItem('wc2026_pseudo') || '';
  const isAdmin = currentPseudo === '_admin_';

  // Score display — no Saisir for regular users; admin sees ✏️ edit
  const scoreBlock = score
    ? `<span class="lc-digit ${hAnim}" style="color:${hColor}">${hGoals}</span>
       <span class="lc-sep">–</span>
       <span class="lc-digit ${aAnim}" style="color:${aColor}">${aGoals}</span>`
    : isAdmin
      ? `<button class="mc-saisir-btn" onclick="event.stopPropagation();promptScore('${g.id}',${i},'${m.h.replace(/'/g,"\\'")}','${m.a.replace(/'/g,"\\'")}')">Saisir</button>`
      : `<span class="lc-sep lc-no-score">–</span>`;

  const adminBtn = isAdmin
    ? `<button class="lc-edit" onclick="event.stopPropagation();promptScore('${g.id}',${i},'${m.h.replace(/'/g,"\\'")}','${m.a.replace(/'/g,"\\'")}')">✏️</button>`
    : '';

  // Connected user's predicted score — shown above the live score
  let myPronoChip = '';
  if (currentPseudo && !isAdmin) {
    try {
      const _u = JSON.parse(localStorage.getItem('wc2026_users') || '{}');
      const _mpProno = _u[currentPseudo]?.pronostics?.[scoreKey] || _u[currentPseudo]?.pronos?.[scoreKey];
      const _mp = (typeof _pronoLabel === 'function') ? (_mpProno ? _pronoLabel(_mpProno, m) : '') : (_mpProno?.score || '');
      if (_mp && _mp !== '—') myPronoChip = `<div class="lc-myprono"><span class="lc-myprono-lbl">Ton prono</span><span class="lc-myprono-score">${_mp}</span></div>`;
    } catch(e) {}
  }

  // Pronostics board — show all users' predictions for this match
  let pronoHtml = '';
  try {
    const allUsers = JSON.parse(localStorage.getItem('wc2026_users') || '{}');
    const realStore = JSON.parse(localStorage.getItem('wc2026_real') || '{}');
    const pseudos = Object.keys(allUsers).filter(u => u !== '_admin_' && !(typeof isRemovedPseudo === 'function' && isRemovedPseudo(u)));
    if (pseudos.length > 0) {
      const MAX_VISIBLE = 5;
      // Points seulement si le match est VRAIMENT terminé (pas en cours).
      // _effectiveReal exclut les matchs 'in' → pas de points prématurés.
      const effReal = (typeof _effectiveReal === 'function') ? _effectiveReal()[scoreKey] : null;
      const allCards = pseudos.map(pseudo => {
        const prono = allUsers[pseudo]?.pronostics?.[scoreKey] || allUsers[pseudo]?.pronos?.[scoreKey];
        if (!prono) return null;
        const pScore = (typeof _pronoLabel === 'function') ? _pronoLabel(prono, m) : (prono.score || '—');
        let cardClass = 'prono-card-pending';
        let ptsBadge = `<span class="pcard-pts pending">?</span>`;
        let glowStyle = '';
        if (effReal && typeof scorePoints === 'function') {
          const result = scorePoints(prono, effReal);
          const total = result.total;
          const isExact = prono.score && prono.score === effReal.score;
          if (isExact) {
            cardClass = 'prono-card-exact';
            glowStyle = `box-shadow:0 0 0 1.5px hsl(45,100%,60%),0 4px 20px hsl(45,100%,40%,0.35)`;
            ptsBadge = `<span class="pcard-pts exact">${total}pts</span>`;
          } else if (total > 0) {
            cardClass = 'prono-card-good';
            glowStyle = `box-shadow:0 0 0 1.5px hsl(145,70%,45%,0.7),0 4px 16px hsl(145,70%,40%,0.25)`;
            ptsBadge = `<span class="pcard-pts good">${total}pts</span>`;
          } else {
            cardClass = 'prono-card-miss';
            ptsBadge = `<span class="pcard-pts miss">0pt</span>`;
          }
        }
        const avatarHtml = typeof getAvatarHtml === 'function'
          ? getAvatarHtml(pseudo, allUsers, 28)
          : `<div class="pcard-avatar" style="background:linear-gradient(135deg,hsl(${pseudoHue(pseudo)},70%,45%),hsl(${pseudoHue(pseudo)+40},80%,35%))">${pseudo.slice(0,2).toUpperCase()}</div>`;
        return { pseudo, pScore, avatarHtml, cardClass, glowStyle, ptsBadge };
      }).filter(Boolean);

      if (allCards.length > 0) {
        const visible = allCards.slice(0, MAX_VISIBLE);
        const overflow = allCards.length - MAX_VISIBLE;
        const cardsHtml = allCards.map((c, idx) => `
          <div class="prono-card ${c.cardClass}" style="${c.glowStyle};animation-delay:${idx * 60}ms;cursor:pointer" onclick="event.stopPropagation();openPronoDetail('${c.pseudo.replace(/'/g,"\\'")}','${scoreKey}')">
            ${c.avatarHtml}
            <div class="pcard-predicted">${c.pScore}</div>
            <div class="pcard-pseudo">${c.pseudo}</div>
            ${c.ptsBadge}
          </div>`).join('');
        const overflowHtml = '';
        const wrapClass = overflow > 0 ? 'lpb-cards has-overflow' : 'lpb-cards';
        pronoHtml = `
          <div class="lc-pronos-board">
            <div class="lpb-label">⚡ Pronostics</div>
            <div class="${wrapClass}">${cardsHtml}${overflowHtml}</div>
          </div>`;
      }
    }
  } catch(e) {}

  return `
  <div class="live-card ${isLive ? 'lc-live' : ''} ${score ? 'lc-has-score' : ''}" onclick="gpMatchClick('${g.id}',${i})">
    ${isLive ? `<div class="lc-live-badge"><span class="mc-live-dot"></span>LIVE${liveClock ? ` · ${liveClock}` : ''}</div>` : `<div class="lc-datetime"><span class="lc-dt-date">${m.d}</span><span class="lc-dt-time">${m.t}</span></div>`}
    <div class="lc-body">
      <div class="lc-team">
        <span class="lc-flag">${hTeam?.flag || ''}</span>
        <span class="lc-name">${m.h}</span>
        ${hScorers}
      </div>
      <div class="lc-score-block">${myPronoChip}<div class="lc-score-digits">${scoreBlock}</div></div>
      <div class="lc-team lc-team-away">
        <span class="lc-flag">${aTeam?.flag || ''}</span>
        <span class="lc-name">${m.a}</span>
        ${aScorers}
      </div>
    </div>
    <div class="lc-meta">Groupe ${g.id} · ${m.v} ${adminBtn}</div>
    ${pronoHtml}
    <button class="lc-compare-btn" onclick="event.stopPropagation();goToCompare('${m.h.replace(/'/g,"\\'")}','${m.a.replace(/'/g,"\\'")}')">⚖ Comparer</button>
  </div>`;
}

function openPseudoPronos(pseudo) {
  const allUsers = JSON.parse(localStorage.getItem('wc2026_users') || '{}');
  const realStore = JSON.parse(localStorage.getItem('wc2026_real') || '{}');
  const user = allUsers[pseudo];
  if (!user) return;

  const pronos = { ...(user.pronos || {}), ...(user.pronostics || {}) };
  const keys = Object.keys(pronos);
  if (keys.length === 0) {
    openPanel(`<div style="padding:40px;text-align:center;color:var(--text-3)">Aucun pronostic</div>`, pseudo);
    return;
  }

  const avatarHtml = getAvatarHtml(pseudo, allUsers, 40);
  const rows = keys.map(scoreKey => {
    const prono = pronos[scoreKey];
    const [gid, midx] = scoreKey.split('_');
    const group = GROUPS.find(g => g.id === gid);
    const match = group?.matches?.[parseInt(midx)];
    if (!match) return '';
    const pScore = (typeof _pronoLabel === 'function') ? _pronoLabel(prono, match) : (prono.score || '—');
    const realScore = realStore[scoreKey]?.score || state.scores[scoreKey];
    let statusHtml = `<span style="color:var(--text-4);font-size:0.78rem">en attente</span>`;
    let pts = '';
    if (realScore && typeof scorePoints === 'function') {
      const real = {
        score: realScore,
        scorers: state.scorers[scoreKey] || { home: [], away: [] },
        penalty: realStore[scoreKey]?.penalty,
        redCards: realStore[scoreKey]?.redCards
      };
      const result = scorePoints(prono, real);
      const isExact = prono.score && prono.score === realScore;
      if (isExact) {
        statusHtml = `<span style="color:#fbbf24;font-weight:700">🎯 Exact</span>`;
      } else if (result.total > 0) {
        statusHtml = `<span style="color:#4ade80;font-weight:700">✓ Bon</span>`;
      } else {
        statusHtml = `<span style="color:#f87171">✗ Raté</span>`;
      }
      pts = `<span style="font-weight:900;color:var(--accent-1);margin-left:8px">${result.total}pts</span>`;
    }
    const hFlag = group.teams.find(t => t.name === match.h)?.flag || '';
    const aFlag = group.teams.find(t => t.name === match.a)?.flag || '';
    return `
    <div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--border-1)">
      <div style="flex:1;font-size:0.88rem;color:var(--text-2)">${hFlag} ${match.h} vs ${match.a} ${aFlag}</div>
      <div style="font-weight:800;font-size:1rem;min-width:40px;text-align:center">${pScore}</div>
      ${realScore ? `<div style="font-size:0.8rem;color:var(--text-3)">(${realScore})</div>` : ''}
      <div>${statusHtml}${pts}</div>
    </div>`;
  }).filter(Boolean).join('');

  const html = `
  <div style="padding:24px 20px">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px">
      ${avatarHtml}
      <div style="font-size:1.3rem;font-weight:900">${pseudo}</div>
    </div>
    <div style="font-size:0.75rem;text-transform:uppercase;letter-spacing:.08em;color:var(--text-4);margin-bottom:8px">${keys.length} pronostic${keys.length > 1 ? 's' : ''}</div>
    ${rows}
  </div>`;
  openPanel(html, '');
}

function statsSwitchTab(tab, btn) {
  document.querySelectorAll('.stats-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.stats-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('stats-panel-' + tab).classList.add('active');
  if (tab === 'wc') renderStats();
}

// ── All players index (lazy built) ────────────────────────────────────
let _spsIndex = null;
function getSpsIndex() {
  if (_spsIndex) return _spsIndex;
  _spsIndex = [];
  Object.entries(TEAMS).forEach(([teamName, td]) => {
    td.players.forEach(p => {
      _spsIndex.push({ ...p, team: teamName, teamColor: td.color || '6366f1', teamFlag: td.flag });
    });
  });
  return _spsIndex;
}

function spsSearch(val) {
  const clear = document.getElementById('sps-clear');
  if (clear) clear.style.display = val.length ? '' : 'none';
  const res = document.getElementById('sps-results');
  if (!res) return;
  if (val.length < 3) { res.innerHTML = ''; res.classList.remove('open'); return; }

  const q = val.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
  const matches = getSpsIndex().filter(p => {
    const n = p.name.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
    return n.includes(q);
  }).slice(0, 12);

  if (!matches.length) {
    res.innerHTML = '<div class="sps-no-result">Aucun joueur trouvé</div>';
    res.classList.add('open');
    return;
  }

  res.innerHTML = matches.map(p => {
    const src = p.photo && !p.photo.includes('dicebear') ? p.photo : null;
    const initials = p.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
    const avatarHtml = src
      ? `<img class="sps-res-photo" src="${src}" onerror="this.style.display='none';this.nextSibling.style.display='flex'">`
      : '';
    return `<div class="sps-res-row" onclick="spsOpenPlayer('${p.team.replace(/'/g,"\\'")}','${p.id}')">
      ${avatarHtml}
      <div class="sps-res-avatar" style="background:#${p.teamColor};${src?'display:none':''};">${initials}</div>
      <div class="sps-res-info">
        <span class="sps-res-name">${p.name}</span>
        <span class="sps-res-meta">${p.teamFlag} ${p.team} · ${p.pos} · ${p.club||'—'}</span>
      </div>
      <span class="sps-res-caps">${p.caps||0} sel.</span>
    </div>`;
  }).join('');
  res.classList.add('open');
}

function spsClear() {
  const inp = document.getElementById('sps-input');
  if (inp) inp.value = '';
  const res = document.getElementById('sps-results');
  if (res) { res.innerHTML = ''; res.classList.remove('open'); }
  const clear = document.getElementById('sps-clear');
  if (clear) clear.style.display = 'none';
  document.getElementById('sps-player-detail').innerHTML = '';
}

function _buildPlayerBlocks(p, td, playerId) {
  const tc = '#' + (td.color || '6366f1').replace('#','');
  const club = PLAYER_CLUB_STATS?.[playerId] || null;
  const ssv2 = (typeof SOFASCORE_V2 !== 'undefined') ? SOFASCORE_V2[playerId] : null;
  const name = cleanPlayerName(p.name);
  const isRealPhoto = p.photo && !p.photo.includes('dicebear');
  const photo = (ssv2?.photo && !isRealPhoto) ? ssv2.photo : (isRealPhoto ? p.photo : null);
  const initials = name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
  const gPerM = p.caps > 0 ? (p.goals / p.caps).toFixed(2) : '—';

  // Photo element
  const photoEl = photo
    ? `<img class="spc-block-photo" src="${photo}" onerror="this.style.display='none';this.nextSibling.style.display='flex'"><div class="spc-block-avatar" style="background:${tc};display:none">${initials}</div>`
    : `<div class="spc-block-avatar" style="background:${tc}">${initials}</div>`;

  // Bloc 1 — Profil
  const bloc1 = `
    <div class="spc-block" style="--tc:${tc}">
      <div class="spc-block-header">
        ${photoEl}
        <div class="spc-block-hero">
          <div class="spc-block-name">${name}</div>
          <div class="spc-block-flag">${td.flag} ${td.name||''} · ${ssv2?.team||p.club||'—'}</div>
        </div>
      </div>
      <div class="spc-block-pills">
        <span class="spc-pill">${p.pos||'—'}</span>
        <span class="spc-pill">#${p.n||'—'}</span>
        ${p.h ? `<span class="spc-pill">📏 ${p.h}</span>` : ''}
        ${p.born ? `<span class="spc-pill">🎂 ${p.born}</span>` : ''}
        ${club?.foot ? `<span class="spc-pill">🦶 ${club.foot}</span>` : ''}
        ${club?.poids ? `<span class="spc-pill">⚖️ ${club.poids}</span>` : ''}
        ${p.debut ? `<span class="spc-pill">🏅 1ère sél. ${p.debut}</span>` : ''}
      </div>
      <div class="spc-block-row3">
        <div class="spc-mini-box"><div class="spc-mini-val">${p.caps||0}</div><div class="spc-mini-lbl">Sélections</div></div>
        <div class="spc-mini-box"><div class="spc-mini-val cn-goals">${p.goals||0}</div><div class="spc-mini-lbl">Buts int.</div></div>
        <div class="spc-mini-box"><div class="spc-mini-val cn-ast">${p.ast||0}</div><div class="spc-mini-lbl">Passes D.</div></div>
        <div class="spc-mini-box"><div class="spc-mini-val">${p.goals+p.ast}</div><div class="spc-mini-lbl">Contrib.</div></div>
        <div class="spc-mini-box"><div class="spc-mini-val">${gPerM}</div><div class="spc-mini-lbl">Buts/match</div></div>
        <div class="spc-mini-box"><div class="spc-mini-val">${p.age||'—'}</div><div class="spc-mini-lbl">Âge</div></div>
      </div>
      ${p.bio ? `<div class="spc-bio">${p.bio}</div>` : ''}
    </div>`;

  // Bloc 2 — Club stats (SOFASCORE_V2 prioritaire, sinon PLAYER_CLUB_STATS)
  let bloc2 = '';
  if (ssv2?.seasons?.length) {
    // Sofascore V2 data
    const totalG = ssv2.seasons.reduce((s,x)=>s+(x.goals||0),0);
    const totalA = ssv2.seasons.reduce((s,x)=>s+(x.assists||0),0);
    const totalM = ssv2.seasons.reduce((s,x)=>s+(x.apps||0),0);
    const avgRating = ssv2.seasons.filter(x=>x.rating).reduce((s,x,_,a)=>s+x.rating/a.length,0).toFixed(2);
    const seasonsHtml = ssv2.seasons.map(s => `
      <div class="spc-comp-row">
        <span class="spc-comp-name">${s.tournament} <span style="color:rgba(255,255,255,0.25);font-weight:400">${s.season}</span></span>
        <div class="spc-comp-nums">
          <span class="spc-cn cn-apps">${s.apps}M</span>
          <span class="spc-cn cn-goals">⚽${s.goals}</span>
          <span class="spc-cn cn-ast">🎯${s.assists}</span>
          ${s.rating ? `<span class="spc-cn" style="color:#fbbf24">★${s.rating}</span>` : ''}
        </div>
      </div>`).join('');
    const transfersHtml = ssv2.transfers?.length ? `
      <div class="spc-block-title" style="margin-top:10px">TRANSFERTS</div>
      ${ssv2.transfers.filter(t=>t.from&&t.to).map(t=>`
        <div class="spc-comp-row">
          <span class="spc-comp-name">${t.from} → ${t.to}</span>
          ${t.fee ? `<span class="spc-cn cn-goals">${t.fee>=1e6?(t.fee/1e6).toFixed(0)+'M€':t.fee+'€'}</span>` : ''}
        </div>`).join('')}` : '';
    bloc2 = `
      <div class="spc-block" style="--tc:${tc}">
        <div class="spc-block-title">EN CLUB · ${ssv2.team||p.club||'—'}</div>
        <div class="spc-block-row3" style="margin-bottom:10px">
          <div class="spc-mini-box"><div class="spc-mini-val cn-goals">${totalG}</div><div class="spc-mini-lbl">Buts</div></div>
          <div class="spc-mini-box"><div class="spc-mini-val cn-ast">${totalA}</div><div class="spc-mini-lbl">Passes D.</div></div>
          <div class="spc-mini-box"><div class="spc-mini-val">${totalM}</div><div class="spc-mini-lbl">Matchs</div></div>
          <div class="spc-mini-box"><div class="spc-mini-val" style="color:#fbbf24">${avgRating}</div><div class="spc-mini-lbl">Note moy.</div></div>
          <div class="spc-mini-box"><div class="spc-mini-val">${ssv2.seasons[0]?.shots||'—'}</div><div class="spc-mini-lbl">Tirs</div></div>
          <div class="spc-mini-box"><div class="spc-mini-val">${ssv2.seasons[0]?.dribbles||'—'}</div><div class="spc-mini-lbl">Dribbles</div></div>
        </div>
        ${club?.valeur||club?.contrat ? `<div class="spc-block-pills" style="margin-bottom:10px">
          ${club.valeur?`<span class="spc-pill">💰 ${club.valeur}</span>`:''}
          ${club.contrat?`<span class="spc-pill">📅 Contrat ${club.contrat}</span>`:''}
        </div>` : ''}
        ${seasonsHtml}
        ${transfersHtml}
      </div>`;
  } else if (club?.saisons) {
    // Fallback PLAYER_CLUB_STATS
    const totalGoals = club.saisons.reduce((s,x)=>s+(x.total?.buts||0),0);
    const totalAst   = club.saisons.reduce((s,x)=>s+(x.total?.passes||0),0);
    const totalApps  = club.saisons.reduce((s,x)=>s+(x.total?.apps||0),0);
    const clubSaisonHtml = club.saisons.map(s => `
      <div class="spc-saison">
        <div class="spc-saison-label">${s.label}</div>
        ${s.comp.map(c => `
          <div class="spc-comp-row">
            <span class="spc-comp-name">${c.nom}</span>
            <div class="spc-comp-nums">
              <span class="spc-cn cn-apps">${c.apps}M (${c.starts} tit.)</span>
              <span class="spc-cn cn-goals">⚽${c.buts}</span>
              <span class="spc-cn cn-ast">🎯${c.passes}</span>
            </div>
          </div>`).join('')}
      </div>`).join('');
    bloc2 = `
      <div class="spc-block" style="--tc:${tc}">
        <div class="spc-block-title">EN CLUB · ${p.club||'—'}</div>
        <div class="spc-block-row3" style="margin-bottom:10px">
          <div class="spc-mini-box"><div class="spc-mini-val cn-goals">${totalGoals}</div><div class="spc-mini-lbl">Buts</div></div>
          <div class="spc-mini-box"><div class="spc-mini-val cn-ast">${totalAst}</div><div class="spc-mini-lbl">Passes D.</div></div>
          <div class="spc-mini-box"><div class="spc-mini-val">${totalApps}</div><div class="spc-mini-lbl">Matchs</div></div>
        </div>
        <div class="spc-block-pills" style="margin-bottom:10px">
          ${club.valeur?`<span class="spc-pill">💰 ${club.valeur}</span>`:''}
          ${club.contrat?`<span class="spc-pill">📅 Contrat ${club.contrat}</span>`:''}
        </div>
        ${clubSaisonHtml}
      </div>`;
  } else {
    bloc2 = `<div class="spc-block" style="--tc:${tc}"><div class="spc-block-title">EN CLUB · ${p.club||'—'}</div><div class="spc-no-data">Stats club non disponibles.</div></div>`;
  }

  return bloc1 + bloc2;
}

function spsOpenPlayer(teamName, playerId) {
  const res = document.getElementById('sps-results');
  if (res) { res.innerHTML = ''; res.classList.remove('open'); }
  const td = getTeamData(teamName);
  if (!td) return;
  const p = td.players.find(pl => pl.id === playerId);
  if (!p) return;
  td.name = teamName;
  const det = document.getElementById('sps-player-detail');
  det.innerHTML = `<div style="padding:16px;display:flex;flex-direction:column;gap:12px">${_buildPlayerBlocks(p, td, playerId)}</div>`;
  // Mobile : ferme le clavier et descend sur la fiche (sinon elle semble "vide")
  if (window.matchMedia('(max-width: 768px)').matches) {
    document.getElementById('sps-input')?.blur();
    setTimeout(() => {
      const sc = document.scrollingElement || document.documentElement;
      const target = sc.scrollTop + det.getBoundingClientRect().top - 70;
      const start = sc.scrollTop, dist = target - start, t0 = Date.now();
      const iv = setInterval(() => {
        const pr = Math.min((Date.now() - t0) / 350, 1);
        sc.scrollTop = start + dist * (1 - Math.pow(1 - pr, 3));
        if (pr >= 1) clearInterval(iv);
      }, 16);
    }, 80);
  }
}

// ── Player Compare ────────────────────────────────────────────────────────────
const _spcState = { a: null, b: null };

function spcSearch(side, val) {
  const clear = document.getElementById(`spc-clear-${side}`);
  const res   = document.getElementById(`spc-results-${side}`);
  if (clear) clear.style.display = val ? 'block' : 'none';
  if (!res) return;
  if (val.length < 3) { res.innerHTML = ''; res.classList.remove('open'); return; }
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
  const q = norm(val);
  const idx = getSpsIndex();
  const hits = idx.filter(p =>
    norm(p.name).includes(q) ||
    norm(p.club || '').includes(q)
  ).slice(0, 8);
  if (!hits.length) { res.innerHTML = '<div class="sps-no-result">Aucun joueur trouvé</div>'; res.classList.add('open'); return; }
  res.classList.add('open');
  res.innerHTML = hits.map(p => {
    const src = p.photo && !p.photo.includes('dicebear') ? p.photo : '';
    const initials = p.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
    return `<div class="sps-res-row" onclick="spcOpenPlayer('${side}','${p.team.replace(/'/g,"\\'")}','${p.id}')">
      ${src ? `<img class="sps-res-photo" src="${src}" onerror="this.style.display='none';this.nextSibling.style.display='flex'">` : ''}
      <div class="sps-res-avatar" style="background:#${p.teamColor};${src?'display:none':''};">${initials}</div>
      <div class="sps-res-info">
        <span class="sps-res-name">${p.name}</span>
        <span class="sps-res-meta">${p.teamFlag} ${p.team} · ${p.pos} · ${p.club||'—'}</span>
      </div>
      <span class="sps-res-caps">${p.caps||0} sel.</span>
    </div>`;
  }).join('');
}

function spcClear(side) {
  const inp = document.getElementById(`spc-input-${side}`);
  if (inp) inp.value = '';
  const res = document.getElementById(`spc-results-${side}`);
  if (res) { res.innerHTML = ''; res.classList.remove('open'); }
  const clr = document.getElementById(`spc-clear-${side}`);
  if (clr) clr.style.display = 'none';
  _spcState[side] = null;
  document.getElementById(`spc-card-${side}`).innerHTML = '';
  spcRenderBars();
}

function spcOpenPlayer(side, teamName, playerId) {
  const res = document.getElementById(`spc-results-${side}`);
  if (res) { res.innerHTML = ''; res.classList.remove('open'); }
  const td = getTeamData(teamName);
  if (!td) return;
  const p = td.players.find(pl => pl.id === playerId);
  if (!p) return;
  _spcState[side] = p;
  td.name = teamName;
  document.getElementById(`spc-card-${side}`).innerHTML = _buildPlayerBlocks(p, td, playerId);
  spcRenderBars();
}

function spcRenderBars() {
  const barsEl = document.getElementById('spc-bars');
  if (!barsEl) return;
  const a = _spcState.a, b = _spcState.b;
  if (!a || !b) { barsEl.innerHTML = ''; return; }

  const metrics = [
    { label: 'Sélections', va: a.caps||0,   vb: b.caps||0 },
    { label: 'Buts int.',  va: a.goals||0,  vb: b.goals||0 },
    { label: 'Passes D.',  va: a.ast||0,    vb: b.ast||0 },
    { label: 'Contrib.',   va: (a.goals||0)+(a.ast||0), vb: (b.goals||0)+(b.ast||0) },
    { label: 'Âge',        va: a.age||0,    vb: b.age||0, inverse: true },
  ];

  barsEl.innerHTML = metrics.map(m => {
    const max = Math.max(m.va, m.vb, 1);
    const pctA = Math.round(m.va / max * 100);
    const pctB = Math.round(m.vb / max * 100);
    const aWin = m.inverse ? m.va <= m.vb : m.va >= m.vb;
    const bWin = m.inverse ? m.vb <= m.va : m.vb >= m.va;
    return `<div class="spc-bar-row">
      <div class="spc-bar-label">${m.label}</div>
      <div class="spc-bar-track">
        <div class="spc-bar-fill-a" style="width:${pctA}%"></div>
      </div>
      <div class="spc-bar-vals">
        <span class="spc-val-a${aWin?' win':''}">${m.va}</span>
        <span class="spc-val-b${bWin?' win':''}">${m.vb}</span>
      </div>
      <div class="spc-bar-track">
        <div class="spc-bar-fill-b" style="width:${pctB}%"></div>
      </div>
    </div>`;
  }).join('');
}

function renderStats() {
  const container = document.getElementById('stats-content');
  if (!container) return;

  const allPlayers = [];
  Object.entries(TEAMS).forEach(([teamName, td]) => {
    td.players.forEach(p => allPlayers.push({ ...p, team: teamName, flag: td.flag }));
  });
  const topAssists     = [...allPlayers].sort((a, b) => (b.ast||0)   - (a.ast||0)).slice(0, 20);
  const topCaps        = [...allPlayers].sort((a, b) => (b.caps||0)  - (a.caps||0)).slice(0, 20);
  const topCareerGoals = [...allPlayers].sort((a, b) => (b.goals||0) - (a.goals||0)).slice(0, 20);

  const medals = ['🥇','🥈','🥉'];

  // ── WC 2026 live scorers (noms nettoyés de la minute, équipe associée) ──
  const wc2026GoalMap = {};
  Object.entries(state.scorers || {}).forEach(([key, { home = [], away = [] }]) => {
    const kp = key.split('_');
    const grp = GROUPS.find(g => g.id === kp[0]);
    const match = grp?.matches[parseInt(kp[1])];
    const add = (n, teamName) => {
      const name = (n || '').replace(/^\d+'(?:\+\d+')?\s*/, '').replace(/\s*\((pen|csc)\)$/, '').trim();
      if (!name) return;
      if (!wc2026GoalMap[name]) wc2026GoalMap[name] = { goals: 0, team: teamName || '' };
      wc2026GoalMap[name].goals++;
    };
    home.forEach(n => add(n, match?.h));
    away.forEach(n => add(n, match?.a));
  });
  const wc2026Entries = Object.entries(wc2026GoalMap)
    .map(([name, v]) => [name, v.goals, v.team])
    .sort((a, b) => b[1] - a[1]);

  function findPlayerInfo(name) {
    const lower = name.toLowerCase();
    for (const [, td] of Object.entries(TEAMS)) {
      const p = td.players.find(pl =>
        pl.name.toLowerCase().includes(lower) ||
        lower.includes(pl.name.split(' ').pop().toLowerCase())
      );
      if (p) return { flag: td.flag, photo: p.photo || '' };
    }
    return { flag: '', photo: '' };
  }

  const emptyLive = (icon, titre, sub) => `
    <div class="wch-empty-state">
      <div class="wch-empty-icon">${icon}</div>
      <div class="wch-empty-title">${titre}</div>
      <div class="wch-empty-sub">${sub}</div>
    </div>`;

  const wc2026ScorersHtml = wc2026Entries.length === 0
    ? emptyLive('⚽', 'Aucun buteur enregistré', 'Les stats se mettront à jour au fil des matchs · Saisie via l\'onglet Calendrier')
    : wc2026Entries.map(([name, goals, teamName], i) => {
        const { flag, photo } = findPlayerInfo(name);
        const teamFlag = flag || GROUPS.flatMap(g => g.teams).find(t => t.name === teamName)?.flag || '⚽';
        return `<div class="wch-scorer-row" style="--delay:${i * 40}ms">
          <div class="wch-sc-rank">${medals[i] || (i + 1)}</div>
          <div class="wch-sc-flag">${teamFlag}</div>
          ${photo ? `<img class="wch-sc-photo" src="${photo}" onerror="this.style.display='none'">` : ''}
          <div class="wch-sc-info">
            <div class="wch-sc-name">${name}</div>
            ${teamName ? `<div class="wch-sc-team">${teamName}</div>` : ''}
          </div>
          <div class="wch-sc-goals wch-goals-live">${goals} ⚽</div>
        </div>`;
      }).join('');

  // ── WC 2026 buts par équipe (state.scores = "2-0") ──
  const _parseSc = (sc) => {
    if (typeof sc === 'string' && sc.includes('-')) {
      const [h, a] = sc.split('-').map(x => parseInt(x.trim()));
      if (!isNaN(h) && !isNaN(a)) return { home: h, away: a };
    }
    if (sc && sc.home !== undefined) return sc;
    return null;
  };
  const wc2026TeamGoals = {};
  Object.entries(state.scores || {}).forEach(([scoreKey, raw]) => {
    const sc = _parseSc(raw);
    if (!sc) return;
    const parts = scoreKey.split('_');
    if (parts.length < 2) return;
    const grp = GROUPS.find(g => g.id === parts[0]);
    if (!grp) return;
    const match = grp.matches[parseInt(parts[1])];
    if (!match) return;
    wc2026TeamGoals[match.h] = (wc2026TeamGoals[match.h] || 0) + (sc.home || 0);
    wc2026TeamGoals[match.a] = (wc2026TeamGoals[match.a] || 0) + (sc.away || 0);
  });
  const teamGoalEntries = Object.entries(wc2026TeamGoals).sort((a, b) => b[1] - a[1]).filter(([, g]) => g > 0);
  const maxTeamGoals = teamGoalEntries[0]?.[1] || 1;

  // ── WC 2026 cleansheets (state.scores = "2-0") ──
  const wc2026CS = {};
  Object.entries(state.scores || {}).forEach(([scoreKey, raw]) => {
    const sc = _parseSc(raw);
    if (!sc) return;
    const parts = scoreKey.split('_');
    if (parts.length < 2) return;
    const grp = GROUPS.find(g => g.id === parts[0]);
    if (!grp) return;
    const match = grp.matches[parseInt(parts[1])];
    if (!match) return;
    if (!wc2026CS[match.h]) wc2026CS[match.h] = { cs: 0, played: 0 };
    if (!wc2026CS[match.a]) wc2026CS[match.a] = { cs: 0, played: 0 };
    wc2026CS[match.h].played++;
    wc2026CS[match.a].played++;
    if ((sc.away || 0) === 0) wc2026CS[match.h].cs++;
    if ((sc.home || 0) === 0) wc2026CS[match.a].cs++;
  });
  const csEntries = Object.entries(wc2026CS)
    .sort((a, b) => b[1].cs - a[1].cs || a[1].played - b[1].played)
    .filter(([, v]) => v.cs > 0);

  const wc2026CSHtml = csEntries.length === 0
    ? emptyLive('🧤', 'Aucun cleansheet encore', 'Les données apparaîtront au fil des matchs')
    : csEntries.map(([teamName, v], i) => {
        const td = TEAMS[teamName] || {};
        return `<div class="wch-scorer-row" style="--delay:${i * 35}ms">
          <div class="wch-sc-rank">${medals[i] || (i + 1)}</div>
          <div class="wch-sc-flag">${td.flag || '🏳'}</div>
          <div class="wch-sc-info">
            <div class="wch-sc-name">${teamName}</div>
            <div class="wch-sc-nation">${v.cs} CS · ${v.played} match${v.played > 1 ? 's' : ''}</div>
          </div>
          <div class="wch-sc-goals" style="color:#22c55e">${v.cs} 🧤</div>
        </div>`;
      }).join('');

  const wc2026TeamGoalsHtml = teamGoalEntries.length === 0
    ? emptyLive('📊', 'Aucune donnée encore', 'Les buts par équipe apparaîtront au fil des matchs')
    : teamGoalEntries.map(([teamName, goals], i) => {
        const td = TEAMS[teamName] || {};
        const pct = Math.round((goals / maxTeamGoals) * 100);
        return `<div class="wch-scorer-row" style="--delay:${i * 35}ms">
          <div class="wch-sc-rank">${medals[i] || (i + 1)}</div>
          <div class="wch-sc-flag">${td.flag || '🏳'}</div>
          <div class="wch-sc-info"><div class="wch-sc-name">${teamName}</div></div>
          <div class="wch-sc-bar-wrap" style="flex:1;max-width:180px">
            <div class="wch-sc-bar" style="--w:${pct}%"></div>
          </div>
          <div class="wch-sc-goals wch-goals-live">${goals} ⚽</div>
        </div>`;
      }).join('');

  // ── Buts/passes WC 2026 (live) fusionnés dans les totaux all-time ──
  // Les classements historiques sont statiques ; on y ajoute les buts/passes
  // marqués lors de l'édition 2026 pour rester cohérents avec le live.
  // Ex : Messi triplé contre l'Algérie → 13 (2006-2022) + 3 = 16.
  const wc2026ByLast = {};
  const _addLast = (rawName, field) => {
    const nm = (rawName || '').replace(/^\d+'(?:\+\d+')?\s*/, '').replace(/\s*\((pen|csc)\)$/, '').trim();
    const last = nm.split(' ').pop().toLowerCase();
    if (!last) return;
    if (!wc2026ByLast[last]) wc2026ByLast[last] = { goals: 0, assists: 0 };
    wc2026ByLast[last][field]++;
  };
  Object.values(state.scorers || {}).forEach(({ home = [], away = [], homeAssists = [], awayAssists = [] }) => {
    home.forEach(n => _addLast(n, 'goals'));
    away.forEach(n => _addLast(n, 'goals'));
    homeAssists.forEach(n => _addLast(n, 'assists'));
    awayAssists.forEach(n => _addLast(n, 'assists'));
  });
  const live2026For = (fullName, field) => {
    const last = (fullName || '').split(' ').pop().toLowerCase();
    return wc2026ByLast[last] ? wc2026ByLast[last][field] : 0;
  };
  const mergeLive = (list, field) => list.map(s => {
    const add = live2026For(s.name, field);
    if (!add) return s;
    return { ...s, [field]: s[field] + add, editions: s.editions.replace(/[–-]\s*\d{4}$/, '–2026'), _live: add };
  });

  // ── Historical scorers ──
  const allScorers = mergeLive(WC_HISTORY.allTimeScorers, 'goals');
  const maxGoals = allScorers.reduce((m, s) => Math.max(m, s.goals), 0);
  const sortedHist = [...allScorers].sort((a, b) => b.goals - a.goals).slice(0, 15);
  const histScorersHTML = sortedHist.map((s, i) => `
    <div class="wch-scorer-row" style="--delay:${i * 50}ms">
      <div class="wch-sc-rank">${medals[i] || (i+1)}</div>
      <div class="wch-sc-flag">${s.flag}</div>
      ${s.img ? `<img class="wch-sc-photo" src="${s.img}" onerror="this.style.display='none'">` : ''}
      <div class="wch-sc-info">
        <div class="wch-sc-name">${s.name}${s._live ? ` <span class="wch-sc-live">+${s._live} '26</span>` : ''}</div>
        <div class="wch-sc-nation">${s.nation} · ${s.editions}</div>
      </div>
      <div class="wch-sc-bar-wrap"><div class="wch-sc-bar" style="--w:${(s.goals/maxGoals)*100}%"></div></div>
      <div class="wch-sc-goals">${s.goals} ⚽</div>
    </div>`).join('');

  // ── Historical passeurs ──
  const allPasseurs = mergeLive(WC_HISTORY.allTimePasseurs, 'assists');
  const maxAssists = allPasseurs.reduce((m, s) => Math.max(m, s.assists), 0);
  const sortedPasseurs = [...allPasseurs].sort((a, b) => b.assists - a.assists);
  const histPasseursHTML = sortedPasseurs.map((s, i) => `
    <div class="wch-scorer-row" style="--delay:${i * 50}ms">
      <div class="wch-sc-rank">${medals[i] || (i+1)}</div>
      <div class="wch-sc-flag">${s.flag}</div>
      ${s.img ? `<img class="wch-sc-photo" src="${s.img}" onerror="this.style.display='none'">` : ''}
      <div class="wch-sc-info">
        <div class="wch-sc-name">${s.name}${s._live ? ` <span class="wch-sc-live">+${s._live} '26</span>` : ''}</div>
        <div class="wch-sc-nation">${s.nation} · ${s.editions}</div>
      </div>
      <div class="wch-sc-bar-wrap"><div class="wch-sc-bar" style="--w:${(s.assists/maxAssists)*100}%;background:var(--accent-2,#8b5cf6)"></div></div>
      <div class="wch-sc-goals" style="color:var(--accent-2,#8b5cf6)">${s.assists} 🎯</div>
    </div>`).join('');

  // ── Palmares ──
  const palmaresHTML = WC_HISTORY.palmares.map((n, i) => `
    <div class="wch-nation-row" style="--delay:${i * 60}ms">
      <div class="wch-nr-left">
        <span class="wch-nr-flag">${n.flag}</span>
        <div>
          <div class="wch-nr-name">${n.nation}</div>
          <div class="wch-nr-years">${n.years}</div>
        </div>
      </div>
      <div class="wch-nr-right">
        <div class="wch-nr-trophies">${'🏆'.repeat(n.titles)}</div>
        <div class="wch-nr-bar-wrap">
          <div class="wch-nr-bar" style="--w:${(n.titles/5)*100}%;background:${n.color}"></div>
        </div>
        <div class="wch-nr-count">${n.titles}</div>
      </div>
    </div>`).join('');

  // ── Golden Ball / Boot ──
  const gbHTML = [...WC_HISTORY.goldenBall].reverse().map(g => `
    <div class="wch-award-row">
      <span class="wch-award-year">${g.year}</span>
      <span class="wch-award-flag">${g.flag}</span>
      <div class="wch-award-info">
        <div class="wch-award-name">${g.name}</div>
        <div class="wch-award-nation">${g.nation}</div>
      </div>
    </div>`).join('');

  const gbootHTML = [...WC_HISTORY.goldenBoot].reverse().map(g => `
    <div class="wch-award-row">
      <span class="wch-award-year">${g.year}</span>
      <span class="wch-award-flag">${g.flag}</span>
      <div class="wch-award-info">
        <div class="wch-award-name">${g.name}</div>
        <div class="wch-award-nation">${g.nation}</div>
      </div>
      <span class="wch-award-goals">${g.goals} ⚽</span>
    </div>`).join('');

  // ── Records ──
  const recordsHTML = WC_HISTORY.records.map(r => `
    <div class="wch-record-card">
      <div class="wch-rc-icon">${r.icon}</div>
      <div class="wch-rc-value">${r.value}</div>
      <div class="wch-rc-label">${r.label}</div>
      <div class="wch-rc-detail">${r.detail}</div>
    </div>`).join('');

  // ── KPI bar ──
  const kpiHTML = `
    <div class="wch-kpis">
      <div class="wch-kpi"><div class="wch-kpi-val" data-count="${WC_HISTORY.editions}">0</div><div class="wch-kpi-lbl">Éditions</div></div>
      <div class="wch-kpi-sep"></div>
      <div class="wch-kpi"><div class="wch-kpi-val" data-count="${WC_HISTORY.totalGoals}">0</div><div class="wch-kpi-lbl">Buts inscrits</div></div>
      <div class="wch-kpi-sep"></div>
      <div class="wch-kpi"><div class="wch-kpi-val" data-count="${WC_HISTORY.totalNations}">0</div><div class="wch-kpi-lbl">Nations qualifiées</div></div>
      <div class="wch-kpi-sep"></div>
      <div class="wch-kpi"><div class="wch-kpi-val" data-count="${WC_HISTORY.totalMatches}">0</div><div class="wch-kpi-lbl">Matchs joués</div></div>
    </div>`;

  // ── Render ──
  container.innerHTML = `
    ${kpiHTML}
    <div class="wch-tabs">
      <button class="wch-tab active"
        onmouseenter="switchStatsTab('scorers-wc2026', this)"
        onclick="switchStatsTab('scorers-wc2026', this)">⚽ WC 2026</button>
      <button class="wch-tab"
        onmouseenter="switchStatsTab('hist-scorers', this)"
        onclick="switchStatsTab('hist-scorers', this)">Buteurs Hist.</button>
      <button class="wch-tab"
        onmouseenter="switchStatsTab('hist-passeurs', this)"
        onclick="switchStatsTab('hist-passeurs', this)">🎯 Passeurs Hist.</button>
      <button class="wch-tab"
        onmouseenter="switchStatsTab('palmares', this)"
        onclick="switchStatsTab('palmares', this)">🏆 Palmarès</button>
      <button class="wch-tab"
        onmouseenter="switchStatsTab('awards', this)"
        onclick="switchStatsTab('awards', this)">⭐ Récompenses</button>
      <button class="wch-tab"
        onmouseenter="switchStatsTab('records', this)"
        onclick="switchStatsTab('records', this)">📊 Records</button>
    </div>

    <!-- ── WC 2026 panel with subtabs (100% live data) ── -->
    <div id="stats-scorers-wc2026" class="wch-panel">
      <div class="wch-subtabs">
        <button class="wch-stab active"
          onmouseenter="switchSubStatsTab('wc2026-scorers', this)"
          onclick="switchSubStatsTab('wc2026-scorers', this)">Buteurs 2026</button>
        <button class="wch-stab"
          onmouseenter="switchSubStatsTab('wc2026-teams', this)"
          onclick="switchSubStatsTab('wc2026-teams', this)">Buts/équipe</button>
        <button class="wch-stab"
          onmouseenter="switchSubStatsTab('wc2026-cs', this)"
          onclick="switchSubStatsTab('wc2026-cs', this)">Cleansheets</button>
      </div>

      <div id="stats-wc2026-scorers" class="stats-table-wrap">
        <div class="wch-section-title" style="margin-bottom:12px">
          Classement buteurs — WC 2026 <span style="color:var(--text-4);font-weight:500;font-size:0.75rem">(live)</span>
        </div>
        <div class="wch-scorers-list">${wc2026ScorersHtml}</div>
      </div>

      <div id="stats-wc2026-teams" class="stats-table-wrap" style="display:none">
        <div class="wch-section-title" style="margin-bottom:12px">
          Buts marqués par équipe — WC 2026 <span style="color:var(--text-4);font-weight:500;font-size:0.75rem">(live)</span>
        </div>
        <div class="wch-scorers-list">${wc2026TeamGoalsHtml}</div>
      </div>

      <div id="stats-wc2026-cs" class="stats-table-wrap" style="display:none">
        <div class="wch-section-title" style="margin-bottom:12px">
          Cleansheets — WC 2026 <span style="color:var(--text-4);font-weight:500;font-size:0.75rem">(live)</span>
        </div>
        <div class="wch-scorers-list">${wc2026CSHtml}</div>
      </div>
    </div>

    <!-- ── Historical scorers ── -->
    <div id="stats-hist-scorers" class="wch-panel" style="display:none">
      <div class="wch-section-title">Meilleurs buteurs de l'histoire de la Coupe du Monde</div>
      <div class="wch-scorers-list">${histScorersHTML}</div>
    </div>

    <!-- ── Historical passeurs ── -->
    <div id="stats-hist-passeurs" class="wch-panel" style="display:none">
      <div class="wch-section-title">
        Meilleurs passeurs de l'histoire de la Coupe du Monde
        <span style="color:var(--text-4);font-weight:400;font-size:0.72rem;margin-left:8px">données estimées — tracking pré-1966 non officiel</span>
      </div>
      <div class="wch-scorers-list">${histPasseursHTML}</div>
    </div>

    <!-- ── Palmarès ── -->
    <div id="stats-palmares" class="wch-panel" style="display:none">
      <div class="wch-section-title">Palmarès par nation</div>
      <div class="wch-nations-list">${palmaresHTML}</div>
    </div>

    <!-- ── Récompenses ── -->
    <div id="stats-awards" class="wch-panel" style="display:none">
      <div class="wch-awards-grid">
        <div class="wch-award-col">
          <div class="wch-award-title">🏅 Ballon d'Or</div>
          ${gbHTML}
        </div>
        <div class="wch-award-col">
          <div class="wch-award-title">👟 Soulier d'Or</div>
          ${gbootHTML}
        </div>
      </div>
    </div>

    <!-- ── Records ── -->
    <div id="stats-records" class="wch-panel" style="display:none">
      <div class="wch-section-title">Records & Anecdotes</div>
      <div class="wch-records-grid">${recordsHTML}</div>
    </div>`;

  // Animate KPI counters
  requestAnimationFrame(() => {
    container.querySelectorAll('.wch-kpi-val[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count);
      const duration = 1200;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const ease = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(ease * target).toLocaleString('fr-FR');
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    setTimeout(() => {
      container.querySelectorAll('.wch-sc-bar, .wch-nr-bar').forEach(b => b.classList.add('animated'));
    }, 200);
  });
}

function switchStatsTab(tabId, btn) {
  btn.closest('.wch-tabs, .stats-tabs').querySelectorAll('.wch-tab, .stats-tab').forEach(t => t.classList.remove('active'));
  // Only hide main panels, NOT the .stats-table-wrap children inside the WC2026 panel
  document.querySelectorAll('.wch-panel').forEach(t => t.style.display = 'none');
  btn.classList.add('active');
  const el = document.getElementById('stats-' + tabId);
  if (el) {
    el.style.display = '';
    // For WC2026 panel: ensure the active subtab wrap is visible (may have been hidden while panel was hidden)
    if (tabId === 'scorers-wc2026') {
      const wraps = el.querySelectorAll('.stats-table-wrap');
      const anyVisible = [...wraps].some(w => w.style.display !== 'none');
      if (!anyVisible && wraps.length > 0) wraps[0].style.display = '';
    }
    setTimeout(() => {
      el.querySelectorAll('.wch-sc-bar, .wch-nr-bar').forEach(b => b.classList.add('animated'));
    }, 50);
  }
}

function switchSubStatsTab(tabId, btn) {
  btn.closest('.wch-subtabs').querySelectorAll('.wch-stab').forEach(t => t.classList.remove('active'));
  const panel = document.getElementById('stats-scorers-wc2026');
  if (panel) panel.querySelectorAll('.stats-table-wrap').forEach(t => t.style.display = 'none');
  btn.classList.add('active');
  const el = document.getElementById('stats-' + tabId);
  if (el) el.style.display = '';
}

function renderStatsTable(players, statKey, statLabel, opts = {}) {
  const showCaps   = !opts.hideCaps;
  const showPasses = !opts.hidePasses;
  const cols = `38px 28px 1fr 56px${showCaps ? ' 46px' : ''}${showPasses ? ' 46px' : ''} 48px`;
  return `
  <div class="stats-list" style="--stats-cols:${cols}">
    <div class="stats-list-header">
      <span class="slh-flag"></span>
      <span class="slh-rank">#</span>
      <span class="slh-player">Joueur</span>
      <span class="slh-stat">${statLabel}</span>
      ${showCaps   ? '<span class="slh-caps">Sél.</span>' : ''}
      ${showPasses ? '<span class="slh-ast">Pass.</span>' : ''}
      <span class="slh-pos">Poste</span>
    </div>
    ${players.map((p, i) => {
    const tColor = getTeamColor(p.team);
    const isDicebear = p.photo && p.photo.includes('dicebear');
    const isReal = p.photo && !isDicebear && p.photo !== '';
    const initials = getPlayerInitials(p.name);
    const photoEl = isReal
      ? `<img class="stats-photo" src="${p.photo}" alt="${p.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
      : '';
    const avatarEl = `<div class="stats-avatar" style="background:${tColor};display:${isReal ? 'none' : 'flex'}">${initials}</div>`;
    const rankStyle = i === 0 ? 'color:#f59e0b;font-size:1.1rem' : i === 1 ? 'color:#94a3b8' : i === 2 ? 'color:#b45309' : '';
    return `
    <div class="stats-list-row" onclick="openPlayerPanel('${p.team.replace(/'/g, "\'")}','${p.id}')">
      <span class="slr-flag">${p.flag || '🏳️'}</span>
      <span class="slr-rank" style="${rankStyle}">${i + 1}</span>
      <div class="slr-player">
        <div class="slr-photo-wrap">${photoEl}${avatarEl}</div>
        <div class="slr-info">
          <div class="slr-name">${p.name}</div>
          <div class="slr-team">${p.team}</div>
        </div>
      </div>
      <span class="slr-stat">${p[statKey] ?? '—'}</span>
      ${showCaps   ? `<span class="slr-caps">${p.caps ?? '—'}</span>`  : ''}
      ${showPasses ? `<span class="slr-ast">${p.ast  ?? '—'}</span>`   : ''}
      <span class="slr-pos"><span class="pos-badge ${posClass(p.pos)}">${posShort(p.pos)}</span></span>
    </div>`;
  }).join('')}
  </div>`;
}

// ── HERO STATS ────────────────────────────────────────────────────────
function renderHeroStats() {
  const totalTeams = GROUPS.reduce((acc, g) => acc + g.teams.length, 0);
  const totalMatches = GROUPS.reduce((acc, g) => acc + g.matches.length, 0);
  const totalPlayers = Object.values(TEAMS).reduce((acc, td) => acc + td.players.length, 0);
  const el = document.getElementById('hero-stats');
  if (el) {
    el.innerHTML = `
      <div class="hero-stat-item"><span class="hero-stat-num">${totalTeams}</span><span class="hero-stat-lbl">Équipes</span></div>
      <div class="hero-stat-sep"></div>
      <div class="hero-stat-item"><span class="hero-stat-num">${totalMatches}</span><span class="hero-stat-lbl">Matchs</span></div>
      <div class="hero-stat-sep"></div>
      <div class="hero-stat-item"><span class="hero-stat-num">${totalPlayers}</span><span class="hero-stat-lbl">Joueurs</span></div>
      <div class="hero-stat-sep"></div>
      <div class="hero-stat-item"><span class="hero-stat-num">12</span><span class="hero-stat-lbl">Groupes</span></div>`;
  }
}

// ── SEARCH ────────────────────────────────────────────────────────────
function handleSearch(query) {
  if (!query || query.length < 2) return;
  const q = query.toLowerCase();
  const results = [];
  Object.entries(TEAMS).forEach(([teamName, td]) => {
    td.players.forEach(p => {
      if (p.name.toLowerCase().includes(q) || teamName.toLowerCase().includes(q)) {
        results.push({ player: p, team: teamName, flag: td.flag });
      }
    });
  });
  if (results.length === 0) {
    showToast('Aucun résultat pour "' + query + '"');
    return;
  }
  const html = `
    <div class="search-results">
      <div class="search-results-count">${results.length} résultat${results.length > 1 ? 's' : ''}</div>
      <div class="players-grid">
        ${results.map(r => renderPlayerCard(r.player, r.team)).join('')}
      </div>
    </div>`;
  openPanel(html, 'Recherche: ' + query);
}

// ── TOAST ─────────────────────────────────────────────────────────────
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ── CALENDAR FILTER ───────────────────────────────────────────────────
function initCalendarFilter() {
  const filterEl = document.getElementById('calendar-filter');
  if (!filterEl) return;
  filterEl.innerHTML = '<option value="all">Tous les groupes</option>' +
    GROUPS.map(g => `<option value="${g.id}">Groupe ${g.id}</option>`).join('');
  filterEl.addEventListener('change', renderCalendar);
}

// ── INIT ──────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const view = link.dataset.view;
      if (view) switchView(view);
    });
  });

  // Panel close
  const closeBtn = document.getElementById('panel-close');
  if (closeBtn) closeBtn.addEventListener('click', closePanel);

  const backdrop = document.getElementById('overlay');
  if (backdrop) backdrop.addEventListener('click', closePanel);

  // Hero CTA
  const heroCta = document.querySelector('.btn-primary[data-action="explore"]');
  if (heroCta) heroCta.addEventListener('click', () => {
    document.getElementById('groups-grid-section')?.scrollIntoView({ behavior: 'smooth' });
  });

  // Search
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSearch(searchInput.value);
    });
  }
  if (searchBtn) {
    searchBtn.addEventListener('click', () => handleSearch(searchInput?.value));
  }

  // Keyboard ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePanel();
  });

  // Init renders
  renderHeroStats();
  renderGroups();
  initCalendarFilter();
  initApp();

  // Start live score polling from NAS
  startLivePolling();

  // Animate groups on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  setTimeout(() => {
    document.querySelectorAll('.group-card').forEach(card => {
      observer.observe(card);
    });
  }, 100);
});


// ── QUIZZ LOGIC ────────────────────────────────────────────────────────
let quizzState = {
    level: 'easy',
    questions: [],
    currentIndex: 0,
    score: 0,
    timer: null,
    timeLeft: 30,
    isAnswered: false
};

function startQuizz(level) {
    quizzState.level = level;
    quizzState.score = 0;
    quizzState.currentIndex = 0;
    
    // Pick 10 random questions from the 50 available
    const pool = QUIZZ_DATA[level];
    quizzState.questions = [...pool].sort(() => 0.5 - Math.random()).slice(0, 10);
    
    document.getElementById('quizz-levels').style.display = 'none';
    document.getElementById('quizz-game').style.display = 'block';
    document.getElementById('quizz-results').style.display = 'none';
    
    showQuestion();
}

function showQuestion() {
    quizzState.isAnswered = false;
    const q = quizzState.questions[quizzState.currentIndex];
    const qText = document.getElementById('quizz-question-text');
    const optionsEl = document.getElementById('quizz-options');
    const progressFill = document.getElementById('quizz-progress-fill');
    const qNum = document.getElementById('quizz-question-num');
    
    qNum.textContent = `Question ${quizzState.currentIndex + 1}/10`;
    qText.textContent = q.q;
    progressFill.style.width = `${(quizzState.currentIndex / 10) * 100}%`;
    
    optionsEl.innerHTML = '';
    q.o.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => handleAnswer(index, btn);
        optionsEl.appendChild(btn);
    });
    
    resetTimer();
}

function resetTimer() {
    clearInterval(quizzState.timer);
    quizzState.timeLeft = 30;
    const timerEl = document.getElementById('quizz-timer');
    timerEl.textContent = `${quizzState.timeLeft}s`;
    
    quizzState.timer = setInterval(() => {
        quizzState.timeLeft--;
        timerEl.textContent = `${quizzState.timeLeft}s`;
        if (quizzState.timeLeft <= 0) {
            handleAnswer(-1); // Timeout
        }
    }, 1000);
}

function handleAnswer(selectedIndex, btn) {
    if (quizzState.isAnswered) return;
    quizzState.isAnswered = true;
    clearInterval(quizzState.timer);
    
    const q = quizzState.questions[quizzState.currentIndex];
    const options = document.querySelectorAll('.option-btn');
    
    options.forEach((b, idx) => {
        b.disabled = true;
        if (idx === q.a) b.classList.add('correct');
        if (idx === selectedIndex && idx !== q.a) b.classList.add('wrong');
    });
    
    if (selectedIndex === q.a) {
        quizzState.score++;
        showToast('✓ Correct !', '#2ed573');
    } else {
        showToast('✗ Mauvais choix', '#ff4757');
    }
    
    setTimeout(() => {
        quizzState.currentIndex++;
        if (quizzState.currentIndex < 10) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function showResults() {
    document.getElementById('quizz-game').style.display = 'none';
    document.getElementById('quizz-results').style.display = 'block';
    
    const scoreEl = document.getElementById('quizz-score');
    const feedbackEl = document.getElementById('quizz-feedback');

    scoreEl.textContent = `${quizzState.score}/10`;

    let feedback = '';

    if (quizzState.score >= 9) {
        feedback = 'Incroyable ! Vous connaissez la Coupe du Monde sur le bout des doigts.';
    } else if (quizzState.score >= 7) {
        feedback = 'Félicitations ! Vous avez une excellente culture footballistique.';
    } else if (quizzState.score >= 5) {
        feedback = 'Pas mal ! Vous avez de bonnes bases, encore un petit effort.';
    } else {
        feedback = 'Ouch... Il va falloir réviser vos classiques World Cup.';
    }

    feedbackEl.textContent = feedback;
}

function quitQuizz() {
    clearInterval(quizzState.timer);
    resetQuizz();
}

function resetQuizz() {
    document.getElementById('quizz-levels').style.display = 'grid';
    document.getElementById('quizz-game').style.display = 'none';
    document.getElementById('quizz-results').style.display = 'none';
}

// ── STADIUMS LOGIC ───────────────────────────────────────────────────
function renderStadiums() {
    const container = document.getElementById('stadiums-content');
    if (!container) return;
    
    container.innerHTML = STADIUMS.map((s, i) => `
        <div class="stadium-card" style="animation-delay: ${i * 0.05}s">
            <div class="stadium-city-overlay" style="background-image: url('${s.cityImg}')"></div>
            <div class="stadium-img-wrap">
                <img src="${s.img}" class="stadium-img" alt="${s.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=600'">
                <div class="stadium-country-tag">${s.country}</div>
            </div>
            <div class="stadium-info">
                <h3 class="stadium-city">${s.city}</h3>
                <div class="stadium-name">${s.name}</div>
                <div class="stadium-cap">Capacité : <span>${s.cap}</span></div>
            </div>
        </div>
    `).join('');
}

// ── COMPARISON LOGIC ────────────────────────────────────────────────
function renderComparison(preTeam1, preTeam2) {
    const s1 = document.getElementById('comp-team-1');
    const s2 = document.getElementById('comp-team-2');
    if (!s1 || !s2) return;

    const teamNames = Object.keys(TEAMS).sort();

    let optionsList = teamNames.map(name => `<option value="${name}">${TEAMS[name].flag} ${name}</option>`).join('');
    s1.innerHTML = optionsList;
    s2.innerHTML = optionsList;

    s1.value = preTeam1 || 'France';
    s2.value = preTeam2 || 'Brésil';

    updateComparison();
}

function updateComparison() {
    const t1Name = document.getElementById('comp-team-1').value;
    const t2Name = document.getElementById('comp-team-2').value;
    const resultEl = document.getElementById('comparison-results');

    const t1 = TEAMS[t1Name];
    const t2 = TEAMS[t2Name];
    if (!t1 || !t2) return;

    const w1 = WC_TEAM_STATS[t1Name] || { apps:0, J:0, V:0, N:0, D:0, BP:0, BC:0, titles:0, best:'—', bestY:'—', top:'—', topG:0 };
    const w2 = WC_TEAM_STATS[t2Name] || { apps:0, J:0, V:0, N:0, D:0, BP:0, BC:0, titles:0, best:'—', bestY:'—', top:'—', topG:0 };

    const c1 = getTeamColor(t1Name);
    const c2 = getTeamColor(t2Name);

    function sofaRow(label, v1, v2, higherIsBetter) {
        const n1 = parseFloat(v1), n2 = parseFloat(v2);
        const total = (n1 + n2) || 1;
        const pct1 = Math.round((n1 / total) * 100);
        const pct2 = 100 - pct1;
        const isWin1 = higherIsBetter ? n1 > n2 : n1 < n2;
        const isWin2 = higherIsBetter ? n2 > n1 : n2 < n1;
        return `<div class="comp-sofa-row">
          <div class="comp-sofa-val ${isWin1 ? 'sofa-win' : ''}">${v1}</div>
          <div class="comp-sofa-label">
            ${label}
            <div class="comp-sofa-bars">
              <div class="comp-bar-left"  style="--bar-w:${pct1};--bar-c:${c1}"></div>
              <div class="comp-bar-right" style="--bar-w2:${pct2};--bar-c2:${c2}"></div>
            </div>
          </div>
          <div class="comp-sofa-val comp-sofa-val2 ${isWin2 ? 'sofa-win' : ''}">${v2}</div>
        </div>`;
    }

    function textRow(label, v1, v2) {
        return `<div class="comp-sofa-row">
          <div class="comp-sofa-val" style="font-size:0.78rem">${v1}</div>
          <div class="comp-sofa-label">${label}</div>
          <div class="comp-sofa-val comp-sofa-val2" style="font-size:0.78rem">${v2}</div>
        </div>`;
    }

    const pct1 = w1.J > 0 ? Math.round(w1.V / w1.J * 100) : 0;
    const pct2 = w2.J > 0 ? Math.round(w2.V / w2.J * 100) : 0;
    const bpm1 = w1.J > 0 ? (w1.BP / w1.J).toFixed(2) : '0.00';
    const bpm2 = w2.J > 0 ? (w2.BP / w2.J).toFixed(2) : '0.00';
    const ratio1 = w1.BC > 0 ? (w1.BP / w1.BC).toFixed(2) : (w1.BP > 0 ? '∞' : '—');
    const ratio2 = w2.BC > 0 ? (w2.BP / w2.BC).toFixed(2) : (w2.BP > 0 ? '∞' : '—');

    const starBadge = (n) => n > 0 ? '⭐'.repeat(Math.min(n,5)) : '—';

    resultEl.innerHTML = `
      <div class="comp-sofa-wrapper">
        <div class="comp-sofa-header" style="background: linear-gradient(135deg, ${c1}18 0%, transparent 40%, transparent 60%, ${c2}18 100%)">
          <div class="comp-sofa-team comp-sofa-team-left" style="border-top: 3px solid ${c1}">
            <div class="comp-sofa-flag">${t1.flag}</div>
            <div class="comp-sofa-name" style="color:${c1}">${t1Name}</div>
            <div class="comp-sofa-meta">${t1.confederation}</div>
            <div class="comp-sofa-badge" style="background:${c1}25;color:${c1};border:1px solid ${c1}50">${starBadge(w1.titles)} ${w1.titles > 0 ? w1.titles + ' titre' + (w1.titles>1?'s':'') : 'Jamais vainqueur'}</div>
            <div class="comp-sofa-meta" style="font-size:0.7rem;margin-top:2px">${w1.bestY}</div>
          </div>
          <div class="comp-sofa-vs-col">
            <div class="comp-sofa-vs">VS</div>
            <div style="font-size:0.52rem;color:var(--text-4);text-transform:uppercase;letter-spacing:0.1em">Coupe du Monde</div>
          </div>
          <div class="comp-sofa-team comp-sofa-team-right" style="border-top: 3px solid ${c2}">
            <div class="comp-sofa-flag">${t2.flag}</div>
            <div class="comp-sofa-name" style="color:${c2}">${t2Name}</div>
            <div class="comp-sofa-meta">${t2.confederation}</div>
            <div class="comp-sofa-badge" style="background:${c2}25;color:${c2};border:1px solid ${c2}50">${starBadge(w2.titles)} ${w2.titles > 0 ? w2.titles + ' titre' + (w2.titles>1?'s':'') : 'Jamais vainqueur'}</div>
            <div class="comp-sofa-meta" style="font-size:0.7rem;margin-top:2px">${w2.bestY}</div>
          </div>
        </div>

        <div class="comp-ios-grid">
          <div class="comp-ios-card">
            <div class="comp-ios-card-title">🏆 Palmarès CM</div>
            ${sofaRow('Titres 🏆', w1.titles, w2.titles, true)}
            ${sofaRow('Éditions disputées', w1.apps, w2.apps, true)}
            ${textRow('Meilleur résultat', w1.best, w2.best)}
          </div>
          <div class="comp-ios-card">
            <div class="comp-ios-card-title">📊 Bilan CM</div>
            ${sofaRow('Matchs joués', w1.J, w2.J, true)}
            ${sofaRow('Victoires', w1.V, w2.V, true)}
            ${sofaRow('Nuls', w1.N, w2.N, false)}
            ${sofaRow('Défaites', w1.D, w2.D, false)}
            ${sofaRow('% victoires', pct1 + '%', pct2 + '%', true)}
          </div>
          <div class="comp-ios-card">
            <div class="comp-ios-card-title">⚽ Attaque CM</div>
            ${sofaRow('Buts marqués (total)', w1.BP, w2.BP, true)}
            ${sofaRow('Buts / match', bpm1, bpm2, true)}
            ${textRow('Record buteur', w1.top + ' (' + w1.topG + ')', w2.top + ' (' + w2.topG + ')')}
            ${sofaRow('Buts record', w1.topG, w2.topG, true)}
          </div>
          <div class="comp-ios-card">
            <div class="comp-ios-card-title">🛡️ Défense CM</div>
            ${sofaRow('Buts encaissés (total)', w1.BC, w2.BC, false)}
            ${sofaRow('Ratio BP/BC', ratio1, ratio2, true)}
            ${sofaRow('Différence de buts', w1.BP - w1.BC, w2.BP - w2.BC, true)}
          </div>
        </div>
      </div>
    `;
}

function getTeamScoreStats(team, teamName) {
    const players = team.players;
    const avgAge  = +(players.reduce((s, p) => s + (p.age||0), 0) / players.length).toFixed(1);
    const avgHeight = +(players.reduce((s, p) => {
        const h = parseFloat((p.h||'1.80').replace('m','.')) || 1.80;
        return s + h;
    }, 0) / players.length).toFixed(2);
    const totalCaps  = players.reduce((s, p) => s + (p.caps||0), 0);
    const totalGoals = players.reduce((s, p) => s + (p.goals||0), 0);
    const totalAst   = players.reduce((s, p) => s + (p.ast||0), 0);
    const avgCaps    = +(totalCaps / players.length).toFixed(1);
    const stars      = players.filter(p => p.caps >= 50).length;
    const goalsPerCap    = totalCaps > 0 ? +(totalGoals / totalCaps).toFixed(3) : 0;
    const contribPerCap  = totalCaps > 0 ? +((totalGoals + totalAst) / totalCaps).toFixed(3) : 0;
    const topGoals   = Math.max(...players.map(p => p.goals||0));
    const eliteClubs = ['Real Madrid','City','Bayern','PSG','Barcelone','Arsenal','Liverpool','Inter Milan','Juventus','Chelsea','Atlético'];
    const elitePlayers = players.filter(p => eliteClubs.some(ec => (p.club||'').includes(ec))).length;
    // rough market val: €5M per elite player + €1M per star + €0.3M per regular
    const marketVal  = Math.round(elitePlayers * 5 + stars * 1 + (players.length - elitePlayers - stars) * 0.3);
    const rank = getTeamRank(teamName);
    return { avgAge, avgHeight, totalCaps, totalGoals, totalAst, avgCaps, stars,
             goalsPerCap, contribPerCap, topGoals, elitePlayers, marketVal, rank };
}

function renderCompRow(label, v1, v2, higherIsBetter) {
    const val1 = parseFloat(v1);
    const val2 = parseFloat(v2);
    let win1 = higherIsBetter ? val1 > val2 : val1 < val2;
    let win2 = higherIsBetter ? val2 > val1 : val2 < val1;
    if (val1 === val2) { win1 = false; win2 = false; }
    return `
        <div class="comp-row">
            <div class="comp-val ${win1 ? 'winner' : ''}">${v1}</div>
            <div class="comp-label">${label}</div>
            <div class="comp-val ${win2 ? 'winner' : ''}">${v2}</div>
        </div>
    `;
}

// ── CUSTOM SQUAD LOGIC ──────────────────────────────────────────────
let customSquadState = {
    selectedTeam: 'France',
    customLineups: {} // { 'France': [playerIds...], ... }
};

function initCustomSquad() {
    loadCustomSquads();
    renderCustomSquad();
}

function changeCustomTeam(val) {
    customSquadState.selectedTeam = val;
    renderCustomSquad();
}

function renderPitchBadges(positions, teamColor) {
    return positions.map(pos => {
        const p = pos.player;
        if (!p) return '';
        return `<div class="pitch-player" style="left:${pos.left}%;top:${pos.top}%">
          <div class="mpp-pitch-circle" style="background:${teamColor}">${p.n}</div>
          <div class="pitch-player-label" style="font-size:0.55rem">${pitchLabel(p.name)}</div>
        </div>`;
    }).join('');
}

function renderCustomSquad() {
    const container = document.getElementById('custom-squad-container');
    if (!container) return;

    const teamName = customSquadState.selectedTeam || 'France';
    const td = TEAMS[teamName];
    if (!td) {
        container.innerHTML = `<div class="panel-empty"><p>Données non disponibles pour ${teamName}</p></div>`;
        return;
    }

    const teamColor = getTeamColor(teamName);

    // Official starters — use ORIGINAL_LINEUPS for correct roles
    const origPool = (ORIGINAL_LINEUPS && ORIGINAL_LINEUPS[teamName]) || td.players;
    const officialStarters = origPool.filter(p => p.role === 'Titulaire');

    // Custom starters — starts EMPTY (null = not set yet)
    const customStartersIds = customSquadState.customLineups[teamName] || [];
    const customStarters = td.players.filter(p => customStartersIds.includes(p.id));

    const posOrder = { 'Gardien': 0, 'Défenseur': 1, 'Milieu': 2, 'Attaquant': 3 };
    const sortedOfficial = [...officialStarters].sort((a,b) => (posOrder[a.pos]||0) - (posOrder[b.pos]||0));
    const sortedCustom   = [...customStarters].sort((a,b)   => (posOrder[a.pos]||0) - (posOrder[b.pos]||0));

    const count = customStartersIds.length;

    // ── MOBILE : vue simple — sélecteur pays, fiche équipe + terrain titulaires ──
    if (window.matchMedia('(max-width: 768px)').matches) {
        const teamNamesM = Object.keys(TEAMS).sort();
        const selectOptsM = teamNamesM.map(n => `<option value="${n}" ${n === teamName ? 'selected' : ''}>${TEAMS[n].flag} ${n}</option>`).join('');
        const posOrderM = { 'Gardien': 0, 'Défenseur': 1, 'Milieu': 2, 'Attaquant': 3 };
        const startersM = [...officialStarters].sort((a, b) => (posOrderM[a.pos] || 0) - (posOrderM[b.pos] || 0));
        container.innerHTML = `
        <div class="cs-mobile">
          <div class="cs-m-picker">
            <span class="cs-picker-flag">${td.flag || ''}</span>
            <select class="cs-m-select" onchange="changeCustomTeam(this.value)">${selectOptsM}</select>
          </div>
          <div class="cs-m-duo">
            <div class="cs-m-card">
              ${TEAM_BANNER_MAP[teamName]
                ? `<img src="${TEAM_BANNER_MAP[teamName]}" alt="${teamName}" onerror="this.style.display='none'">`
                : `<div class="cs-img-fallback">${td.flag}</div>`}
              <div class="cs-m-card-name">${td.flag} ${teamName}</div>
            </div>
            <div class="cs-m-pitch">
              <div class="football-pitch">
                ${renderPitchLines()}
                <div class="pitch-players">${(() => {
                  // terrain complet : une ligne par poste, répartie sur la hauteur
                  const lines = [['Attaquant', 16], ['Milieu', 42], ['Défenseur', 68], ['Gardien', 90]];
                  return lines.map(([pos, y]) => {
                    const ps = startersM.filter(p => (p.pos || '').startsWith(pos));
                    return ps.map((p, i) => `
                      <div class="pitch-player" style="left:${Math.round((i + 1) / (ps.length + 1) * 100)}%;top:${y}%">
                        <div class="mpp-pitch-circle" style="background:${teamColor}">${p.n || ''}</div>
                        <div class="pitch-player-label" style="font-size:0.52rem">${(p.name || '').split(' ').pop().toUpperCase().slice(0, 9)}</div>
                      </div>`).join('');
                  }).join('');
                })()}</div>
              </div>
            </div>
          </div>
          <div class="cs-m-list">
            <div class="cs-m-list-title">XI titulaire · ${td.coach ? 'Sél. ' + td.coach : ''} ${td.formation ? '· ' + td.formation : ''}</div>
            ${startersM.map(p => `
              <div class="cs-m-row" onclick="openTeamPanel('${teamName.replace(/'/g, "\\'")}')">
                <span class="cs-m-num" style="background:${teamColor}">${p.n || '—'}</span>
                <span class="cs-m-name">${cleanPlayerName(p.name)}</span>
                <span class="cs-m-pos"><span class="pos-badge ${posClass(p.pos)}">${posShort(p.pos)}</span></span>
              </div>`).join('')}
          </div>
        </div>`;
        return;
    }

    // Pool grouped by position
    const posGroups = { 'Gardien':[], 'Défenseur':[], 'Milieu':[], 'Attaquant':[] };
    td.players.forEach(p => {
        const key = Object.keys(posGroups).find(k => (p.pos||'').startsWith(k)) || 'Milieu';
        posGroups[key].push(p);
    });
    const poolHtml = Object.entries(posGroups).filter(([,ps]) => ps.length).map(([pos, players]) => `
        <div class="cs-pool-section">${posShort(pos)}</div>
        ${players.map(p => {
            const sel = customStartersIds.includes(p.id);
            return `<div class="cs-pool-player ${sel ? 'cs-pool-selected' : ''}" onclick="togglePlayerInCustom('${p.id}')">
                <div class="cs-pool-num" style="background:${teamColor}">${p.n}</div>
                <span class="cs-pool-name">${p.name.split(' ').pop()}</span>
                ${sel ? '<span class="cs-pool-tick">✓</span>' : ''}
            </div>`;
        }).join('')}
    `).join('');

    // Team options
    const teamNames = Object.keys(TEAMS).sort();
    const selectOpts = teamNames.map(n => `<option value="${n}" ${n===teamName?'selected':''}>${TEAMS[n].flag} ${n}</option>`).join('');

    container.innerHTML = `
    <!-- ── Top bar ── -->
    <div class="cs-topbar" style="--tc:${teamColor}">
      <div class="cs-tb-brand">
        <span class="cs-tb-title">Ma Sélection</span>
      </div>
      <div class="cs-tb-right">
        <div class="cs-counter ${count===11?'cs-counter-full':''}">${count}<span>/11</span></div>
        <button class="cs-btn-save"  onclick="saveCustomSquad()">💾 Sauver</button>
        <button class="cs-btn-reset" onclick="resetCustomSquad()">↺ Réinit.</button>
      </div>
    </div>

    <!-- ── Content ── -->
    <div class="cs-layout">
      <!-- Official pitch -->
      <div class="cs-pitch-col">
        <div class="cs-pitch-label">Équipe Officielle</div>
        <div class="cs-pitch-wrap">
          <div class="football-pitch">
            ${renderPitchLines()}
            <div class="pitch-players">${renderPitchBadges(computePitchPositions(sortedOfficial), teamColor)}</div>
          </div>
        </div>
      </div>

      <!-- Center image -->
      <div class="cs-center-img-col">
        <div class="cs-picker-wrap">
          <div class="cs-picker-display" aria-hidden="true">
            <span class="cs-picker-flag">${td.flag || ''}</span>
            <span class="cs-picker-name">${teamName}</span>
            <svg class="cs-picker-chevron" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/></svg>
          </div>
          <select class="cs-center-select" onchange="changeCustomTeam(this.value)" title="Choisir une équipe">${selectOpts}</select>
        </div>
        <div class="cs-center-img-wrap">
          ${TEAM_BANNER_MAP[teamName]
            ? `<img src="${TEAM_BANNER_MAP[teamName]}" class="cs-team-img-big" alt="${teamName}" onerror="this.style.display='none'">`
            : `<div class="cs-img-fallback">${td.flag}</div>`}
        </div>
      </div>

      <!-- Custom pitch -->
      <div class="cs-pitch-col">
        <div class="cs-pitch-label">Votre XI ${count > 0 ? `(${count}/11)` : '— Vide'}</div>
        <div class="cs-pitch-wrap">
          <div class="football-pitch">
            ${renderPitchLines()}
            <div class="pitch-players">${renderPitchBadges(computePitchPositions(sortedCustom), teamColor)}</div>
            ${count === 0 ? `<div class="cs-empty-hint">Cliquez sur les joueurs →</div>` : ''}
          </div>
        </div>
      </div>

      <!-- Player pool -->
      <div class="cs-pool-col-outer">
        <div class="cs-pitch-label" aria-hidden="true" style="visibility:hidden">·</div>
        <div class="cs-pool-col">
          <div class="cs-pool-header">Effectif · ${td.players.length} joueurs</div>
          <div class="cs-pool-list">${poolHtml}</div>
        </div>
      </div>
    </div>`;
}

function togglePlayerInCustom(playerId) {
    const teamName = customSquadState.selectedTeam;
    let currentLineup = customSquadState.customLineups[teamName] || [];
    
    if (currentLineup.includes(playerId)) {
        currentLineup = currentLineup.filter(id => id !== playerId);
    } else {
        if (currentLineup.length >= 11) {
            showNotification("Vous avez déjà 11 titulaires", "warning");
            return;
        }
        currentLineup.push(playerId);
    }
    
    customSquadState.customLineups[teamName] = currentLineup;
    renderCustomSquad();
}

function resetCustomSquad() {
    const teamName = customSquadState.selectedTeam;
    delete customSquadState.customLineups[teamName];
    renderCustomSquad();
    showNotification("Retour à la composition officielle");
}

function resetCustomSquad() {
    const teamName = customSquadState.selectedTeam || 'France';
    if (confirm("Voulez-vous réinitialiser votre sélection pour cette équipe ?")) {
        delete customSquadState.customLineups[teamName];
        localStorage.setItem('wc2026_custom_squads', JSON.stringify(customSquadState.customLineups));
        renderCustomSquad();
        showNotification("Sélection réinitialisée aux titulaires officiels", "info");
    }
}

function saveCustomSquad() {
    localStorage.setItem('wc2026_custom_squads', JSON.stringify(customSquadState.customLineups));
    showNotification("Sélection enregistrée !");
}

function loadCustomSquads() {
    const saved = localStorage.getItem('wc2026_custom_squads');
    if (saved) {
        try {
            customSquadState.customLineups = JSON.parse(saved);
        } catch(e) {
            console.error("Error loading custom squads", e);
        }
    }
}

function showNotification(msg, type = 'info') {
    let container = document.getElementById('notifications-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notifications-container';
        container.style.cssText = 'position:fixed; bottom:20px; right:20px; z-index:9999; display:flex; flex-direction:column; gap:10px;';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.style.cssText = `
        padding: 12px 24px;
        background: ${type === 'warning' ? 'var(--rose)' : 'var(--emerald)'};
        color: white;
        border-radius: 12px;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        animation: slideIn 0.3s var(--ease-out);
    `;
    toast.textContent = msg;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.5s';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}


// ── APP STARTUP & NAVIGATION ──────────────────────────────────────────
function initApp() {
    console.log("WC 2026: Initializing Application...");

    // Inject squads declared in extra_data.js into the main TEAMS object
    if (typeof MISSING_TEAMS !== 'undefined') Object.assign(TEAMS, MISSING_TEAMS);

    // Restore missing flags and colors from GROUPS to TEAMS
    if (typeof GROUPS !== 'undefined' && typeof TEAMS !== 'undefined') {
        GROUPS.forEach(g => {
            g.teams.forEach(t => {
                const td = TEAMS[t.name];
                if (td) {
                    if (!td.flag) td.flag = t.flag;
                    
                    // Simple color fallbacks
                    if (!td.color) {
                       const cMap = {
                           'Pays-Bas': '#f36c21', 'Belgique': '#e30613', 'Arabie saoudite': '#006c35',
                           'Maroc': '#c1272d', 'Colombie': '#fcd116', 'Uruguay': '#0038a8',
                           'Japon': '#000555', 'Écosse': '#002B7F', 'Slovaquie': '#0b4ea2',
                           'Espagne': '#c60b1e', 'Argentine': '#43a1d5', 'Brésil': '#009c3b',
                           'Portugal': '#006600', 'Angleterre': '#ffffff', 'Allemagne': '#000000',
                           'États-Unis': '#3c3b6e'
                       };
                       td.color = cMap[t.name] || '#333333';
                    }
                }
            });
        });
    }
    
    // Initialiser les onglets des groupes
    const groupTabs = document.getElementById('group-tabs');
    if (groupTabs) {
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
        groupTabs.innerHTML = letters.map(l => `
            <button class="filter-tab ${l === 'A' ? 'active' : ''}" onclick="state.group='${l}'; renderGroups(); this.parentElement.querySelectorAll('.filter-tab').forEach(b=>b.classList.remove('active')); this.classList.add('active');">
                Groupe ${l}
            </button>
        `).join('');
    }

    // Nav links configurés dans DOMContentLoaded — pas de double listener ici

    // Initialiser les sélecteurs du comparateur
    initComparisonSelectors();
    initCustomSquad();

    // Affichage par défaut (Groupes)
    switchView('groups');
    renderGroups();
}

function initComparisonSelectors() {
    const s1 = document.getElementById('comp-team-1');
    const s2 = document.getElementById('comp-team-2');
    if (!s1 || !s2) return;

    const teamNames = Object.keys(TEAMS).sort();
    const options = teamNames.map(name => `<option value="${name}">${name}</option>`).join('');
    
    s1.innerHTML = '<option value="">Choisir une équipe...</option>' + options;
    s2.innerHTML = '<option value="">Choisir une équipe...</option>' + options;

    s1.addEventListener('change', updateComparison);
    s2.addEventListener('change', updateComparison);
}



// ── STANDINGS LOGIC ───────────────────────────────────────────────────
function getGroupStandings(groupId) {
  const group = GROUPS.find(g => g.id === groupId);
  if (!group) return [];
  
  const standings = group.teams.map(t => ({
    ...t, mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0
  }));
  
  group.matches.forEach((m, i) => {
    const scoreKey = groupId + '_' + i;
    const score = state.scores[scoreKey] || m.s; // Use simulated or real score
    if (score && score.includes('-')) {
      const parts = score.split('-');
      const h = parseInt(parts[0].trim());
      const a = parseInt(parts[1].trim());
      
      const homeTeam = standings.find(t => t.name === m.h);
      const awayTeam = standings.find(t => t.name === m.a);
      
      if (homeTeam && awayTeam && !isNaN(h) && !isNaN(a)) {
        homeTeam.mp++; awayTeam.mp++;
        homeTeam.gf += h; homeTeam.ga += a;
        awayTeam.gf += a; awayTeam.ga += h;
        
        if (h > a) { homeTeam.w++; awayTeam.l++; homeTeam.pts += 3; }
        else if (h < a) { awayTeam.w++; homeTeam.l++; awayTeam.pts += 3; }
        else { homeTeam.d++; awayTeam.d++; homeTeam.pts += 1; awayTeam.pts += 1; }
        
        homeTeam.gd = homeTeam.gf - homeTeam.ga;
        awayTeam.gd = awayTeam.gf - awayTeam.ga;
      }
    }
  });
  
  return standings.sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
}

// ── LEGENDARY SECTION HELPER ──────────────────────────────────────────
function renderLegendarySection(teamName) {
  const legend = (typeof LEGENDARY_XIS !== 'undefined') ? LEGENDARY_XIS[teamName] : null;
  if (!legend) return '';
  
  return `
    <div class="legendary-section">
      <div class="legendary-title">🏆 ${legend.title}</div>
      <div class="legendary-grid">
        ${legend.players.map(lp => `<div class="legend-player">${lp}</div>`).join('')}
      </div>
    </div>
  `;
}

// ── KNOCKOUT STAGE LOGIC ─────────────────────────────────────────────
function isGroupComplete(groupId) {
  const group = GROUPS.find(g => g.id === groupId);
  if (!group) return false;
  return group.matches.every((m, i) => {
    const score = state.scores[groupId + '_' + i];
    return score && score.includes('-');
  });
}

function getQualifiedTeams() {
  const allStandings = GROUPS.map(g => ({
    id: g.id,
    complete: isGroupComplete(g.id),
    standings: getGroupStandings(g.id)
  }));

  // Top 1 and 2: null if group not complete
  const firsts = allStandings.map(s => s.complete ? s.standings[0] : null);
  const seconds = allStandings.map(s => s.complete ? s.standings[1] : null);

  // Best 3rds: need ALL groups complete to rank them
  const allComplete = allStandings.every(s => s.complete);
  const thirds = allComplete
    ? allStandings.map(s => s.standings[2])
        .sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf)
        .slice(0, 8)
    : Array(8).fill(null);

  return { firsts, seconds, thirds };
}

// ── Club stats per player id ─────────────────────────────────────────
const PLAYER_CLUB_STATS = {
  'fr24': { // Kylian Mbappé
    palmarès: ['🏆 Coupe du Monde 2018', '🥈 Finale Coupe du Monde 2022', '🥇 JO Paris 2024 (non sélectionné)', '🏆 Ligue 1 × 6 (2018-22 · PSG, 2024-25 · Paris)', '🏆 Champions League 2024-25 · Real Madrid', '🏆 Supercoupe d\'Europe 2022', '🏆 Coupe de France × 5', '🏆 La Liga 2023-24', '🏆 Supercoupe d\'Espagne 2024', '⚽ Meilleur buteur history équipe de France', '⚽ Meilleur buteur LaLiga 2024-25 (38 buts)', '🥇 Meilleur Jeune CM 2018'],
    valeur: '200M€', contrat: 'Juin 2029',
  },
  'fr17': { // Adrien Rabiot
    palmarès: ['🏆 Ligue 1 × 5 (PSG)', '🥈 Finale Coupe du Monde 2022', '🏆 Coupe de France × 2', '🏆 Serie A 2019-20 · Juventus', '🏆 Coppa Italia 2020-21', '🏆 Champions League 2024-25 · AC Milan'],
    valeur: '15M€', contrat: 'Juin 2026',
  },
  'fr21': { // N'Golo Kanté
    palmarès: ['🏆 Coupe du Monde 2018', '🏆 Premier League 2015-16 · Leicester', '🏆 Premier League 2016-17 · Chelsea', '🏆 Champions League 2020-21 · Chelsea', '🏆 FA Cup 2017-18', '🏆 Serie A 2024-25 · Fenerbahçe (pré-Türk)', '🥇 Meilleur Joueur PL 2016-17', '⭐ Équipe-type Mondial 2018'],
    valeur: '5M€', contrat: 'Juin 2026',
  },
  'fr25': { // Ousmane Dembélé
    palmarès: ['🏆 Champions League 2024-25 · PSG', '🏆 Ligue 1 2024-25', '🏆 La Liga 2022-23 · Barcelone', '🏆 Champions League 2021-22 · finaliste', '🥈 Finale CM 2022 · France', '🏆 Coupe de France 2024-25'],
    valeur: '80M€', contrat: 'Juin 2028',
  },
  'fr28': { // Marcus Thuram
    palmarès: ['🥈 Finale Coupe du Monde 2022', '🏆 Serie A 2023-24 · Inter Milan', '🥇 JO 2020 (non engagé)', '🏆 Bundesliga 2021-22 · finaliste'],
    valeur: '60M€', contrat: 'Juin 2028',
  },
  'fr15': { // Aurélien Tchouaméni
    palmarès: ['🏆 Champions League 2023-24 · Real Madrid', '🏆 La Liga 2023-24 · Real Madrid', '🥈 Finale Coupe du Monde 2022', '🏆 Supercoupe d\'Espagne 2024'],
    valeur: '80M€', contrat: 'Juin 2028',
  },
  'fr1': { // Mike Maignan
    palmarès: ['🏆 Ligue 1 2020-21 · LOSC (Meilleur gardien)', '🏆 Champions League 2024-25 · AC Milan (finaliste)', '🏅 Équipe-type Serie A × 3'],
    valeur: '50M€', contrat: 'Juin 2026',
  },
  'fr4': { // William Saliba
    palmarès: ['🥇 Équipe-type Premier League 2022-23, 2023-24', '🏆 Community Shield 2023', '🥈 Finale FA Cup 2024-25'],
    valeur: '100M€', contrat: 'Juin 2027',
  },
  'fr6': { // Jules Koundé
    palmarès: ['🏆 La Liga 2022-23 · Barcelone', '🏆 Champions League 2024-25 · Barcelone', '🏆 Supercoupe d\'Espagne 2024', '🥈 Finale CM 2022 · France'],
    valeur: '60M€', contrat: 'Juin 2027',
  },
  'fr8': { // Ibrahima Konaté
    palmarès: ['🏆 Premier League 2024-25 · Liverpool', '🏆 League Cup 2024-25', '🏆 Community Shield 2022', '🥈 Champions League 2021-22 · finaliste'],
    valeur: '60M€', contrat: 'Juin 2026',
  },
  'fr9': { // Lucas Hernández
    palmarès: ['🏆 Coupe du Monde 2018', '🥈 Finale Coupe du Monde 2022', '🏆 Champions League 2023-24 · Real Madrid', '🏆 Bundesliga × 4 · Bayern'],
    valeur: '15M€', contrat: 'Juin 2027',
  },
  'fr20': { // Warren Zaïre-Emery
    palmarès: ['🏆 Ligue 1 2023-24, 2024-25 · PSG', '🏆 Champions League 2024-25 · PSG', '🏆 Coupe de France 2024-25', '⭐ Meilleur jeune Ligue 1 2023-24'],
    valeur: '70M€', contrat: 'Juin 2029',
  },
  'fr27': { // Bradley Barcola
    palmarès: ['🏆 Ligue 1 2024-25 · PSG', '🏆 Champions League 2024-25 · PSG', '🏆 Coupe de France 2024-25'],
    valeur: '80M€', contrat: 'Juin 2029',
  },
  'fr32': { // Désiré Doué
    club: 'PSG', clubLogo: null,
    foot: 'Droit', taille: '1m81', poids: '72kg',
    valeur: '80M€', contrat: 'Juin 2029',
    saisons: [
      { label: '2024-25 · PSG', comp: [
        { nom: 'Ligue 1',        apps: 22, starts: 15, buts: 7,  passes: 6,  minsPerGoal: 190 },
        { nom: 'Ligue des Champions', apps: 12, starts: 10, buts: 6,  passes: 4,  minsPerGoal: 150 },
        { nom: 'Coupe de France',apps: 3,  starts: 2,  buts: 1,  passes: 1,  minsPerGoal: 210 },
      ], total: { apps: 37, buts: 14, passes: 11, mins: 2680 } },
      { label: '2023-24 · Stade Rennais', comp: [
        { nom: 'Ligue 1',        apps: 35, starts: 28, buts: 8,  passes: 9,  minsPerGoal: 280 },
        { nom: 'Conf. League',   apps: 6,  starts: 5,  buts: 2,  passes: 1,  minsPerGoal: 300 },
      ], total: { apps: 41, buts: 10, passes: 10, mins: 2950 } },
      { label: '2022-23 · Stade Rennais', comp: [
        { nom: 'Ligue 1',        apps: 26, starts: 14, buts: 5,  passes: 4,  minsPerGoal: 290 },
      ], total: { apps: 26, buts: 5, passes: 4, mins: 1740 } },
    ],
    palmarès: ['🏆 Ligue des Champions 2024-25', '🏆 Ligue 1 2024-25', '🏆 Coupe de France 2024-25'],
    style: 'Ailier gauche explosif, dribbleur, finisseur. Capable d\'évoluer en 10 ou en pointe.',
    similarTo: ['Riyad Mahrez', 'Ousmane Dembélé'],
  },
};

function openPlayerStats(teamName, playerId) {
  openPlayerPanel(teamName, playerId);
}

function showCalPlayerCard(teamName, playerId, triggerEl) {
  // Remove any existing popup
  document.querySelectorAll('.cal-player-popup').forEach(el => el.remove());

  const td = getTeamData(teamName);
  if (!td) return;
  // Starters may use lineup IDs (mx1, mx2…) different from td.players IDs — match by starter name
  const starter = getOfficialStarters(teamName).find(s => s.id === playerId);
  let p = td.players.find(pl => pl.id === playerId);
  if (!p && starter) {
    const sn = cleanPlayerName(starter.name).toLowerCase();
    p = td.players.find(pl => cleanPlayerName(pl.name).toLowerCase() === sn)
      || td.players.find(pl => cleanPlayerName(pl.name).toLowerCase().includes(sn.split(' ').pop()));
  }
  if (!p && starter) {
    p = { ...starter };
  }
  if (!p) return;

  const teamColor = (td && td.color) ? ('#' + td.color.replace('#', '')) : '#6366f1';
  const isDicebear = p.photo && p.photo.includes('dicebear');
  const isRealPhoto = p.photo && !isDicebear;
  const initials = getPlayerInitials(p.name);
  const shortName = cleanPlayerName(p.name).split(' ').pop();

  const photoHtml = isRealPhoto
    ? `<img class="cpp-photo" src="${p.photo}" alt="${p.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
    : '';
  const avatarHtml = `<div class="cpp-avatar" style="${isRealPhoto ? 'display:none;' : ''}background:${teamColor}">${initials}</div>`;

  const popup = document.createElement('div');
  popup.className = 'cal-player-popup';
  popup.innerHTML = `
    <div class="cpp-card" style="--tc:${teamColor}">
      <button class="cpp-close" onclick="event.stopPropagation();this.closest('.cal-player-popup').remove()">×</button>
      <div class="cpp-num" style="background:${teamColor}">${p.n}</div>
      <div class="cpp-photo-wrap">${photoHtml}${avatarHtml}</div>
      <div class="cpp-gradient"></div>
      <div class="cpp-info">
        <div class="cpp-name">${shortName}</div>
        <div class="cpp-pos-row">
          <span class="pos-badge ${posClass(p.pos)}">${posShort(p.pos)}</span>
          <span class="cpp-age">${p.age} ans</span>
        </div>
      </div>
      <div class="cpp-stats">
        <div class="cpp-stat"><span class="cpp-sv">${p.caps}</span><span class="cpp-sl">Caps</span></div>
        <div class="cpp-stat"><span class="cpp-sv">${p.goals}</span><span class="cpp-sl">Buts</span></div>
        <div class="cpp-stat"><span class="cpp-sv">${p.ast}</span><span class="cpp-sl">Passes</span></div>
      </div>
    </div>
  `;

  // Position fixed over the flip wrapper — avoids 3D/overflow clipping issues
  const flipWrapper = triggerEl.closest('.mc-flip-wrapper');
  if (flipWrapper) {
    const rect = flipWrapper.getBoundingClientRect();
    popup.style.position = 'fixed';
    popup.style.top = rect.top + 'px';
    popup.style.left = rect.left + 'px';
    popup.style.width = rect.width + 'px';
    popup.style.height = rect.height + 'px';
    popup.style.borderRadius = '10px';
    popup.style.overflow = 'hidden';

    // Use confrontation poster as blurred background
    const posterImg = flipWrapper.querySelector('.mc-back-poster-img');
    if (posterImg?.src) {
      popup.dataset.bgUrl = posterImg.src;
      popup.style.setProperty('--cpp-bg', `url(${posterImg.src})`);
    }

    document.body.appendChild(popup);
  }

  // Click on blurred area (popup itself, not the card) → dismiss
  popup.addEventListener('click', function(e) {
    if (!e.target.closest('.cpp-card')) popup.remove();
  });
}
function _openPlayerStatsFull(teamName, playerId) {
  const td = getTeamData(teamName);
  if (!td) return;
  const p = td.players.find(pl => pl.id === playerId);
  if (!p) { openPlayerPanel(teamName, playerId); return; }

  const teamColor = (td && td.color) ? ('#' + td.color.replace('#', '')) : '#6366f1';
  const club = PLAYER_CLUB_STATS[playerId];
  const name = cleanPlayerName(p.name);
  const isRealPhoto = p.photo && !p.photo.includes('dicebear');

  // National team ratios
  const gPerM  = p.caps > 0 ? (p.goals / p.caps).toFixed(2) : '—';
  const aPerM  = p.caps > 0 ? (p.ast   / p.caps).toFixed(2) : '—';
  const contribPct = p.caps > 0 ? Math.min(100, Math.round((p.goals + p.ast) / p.caps * 50)) : 0;
  const goalPct    = p.caps > 0 ? Math.min(100, Math.round(p.goals / p.caps * 100)) : 0;

  // Club saisons HTML
  const clubHtml = club ? `
    <div class="ps-section-label">EN CLUB</div>
    <div class="ps-club-meta">
      <span class="ps-chip2">${club.foot} · ${club.taille} · ${club.poids}</span>
      <span class="ps-chip2">💰 ${club.valeur}</span>
      <span class="ps-chip2">📅 Contrat ${club.contrat}</span>
    </div>
    ${club.saisons.map(s => `
      <div class="ps-saison">
        <div class="ps-saison-label">${s.label}</div>
        <div class="ps-saison-total">
          <span>${s.total.apps} matchs</span>
          <span class="ps-saison-key">${s.total.buts} ⚽</span>
          <span class="ps-saison-key">${s.total.passes} 🎯</span>
          <span>${Math.round(s.total.mins/60)}h de jeu</span>
        </div>
        <div class="ps-comps">
          ${s.comp.map(c => `
            <div class="ps-comp-row">
              <span class="ps-comp-name">${c.nom}</span>
              <span class="ps-comp-apps">${c.apps} matchs (${c.starts} tit.)</span>
              <div class="ps-comp-stats">
                <span class="ps-cs-goal">⚽ ${c.buts}</span>
                <span class="ps-cs-ast">🎯 ${c.passes}</span>
                <span class="ps-cs-mpg">1 but / ${c.minsPerGoal}'</span>
              </div>
            </div>`).join('')}
        </div>
      </div>`).join('')}
    <div class="ps-section-label" style="margin-top:14px">PALMARÈS</div>
    <div class="ps-palmares">${club.palmarès.map(t => `<div class="ps-palm-row">${t}</div>`).join('')}</div>
    <div class="ps-style-note">${club.style}</div>
  ` : `<div class="ps-no-club">Statistiques club non disponibles</div>`;

  const html = `
    <div class="ps-wrap" style="--tc:${teamColor}">
      <div class="ps-header">
        <div class="ps-hero">
          ${isRealPhoto ? `<img class="ps-photo" src="${p.photo}" alt="${name}" onerror="this.style.display='none'">` : `<div class="ps-avatar" style="background:${teamColor}">${name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()}</div>`}
          <div class="ps-hero-info">
            <div class="ps-name">${name}</div>
            <div class="ps-sub">${p.club} · ${p.pos} · #${p.n}</div>
            <div class="ps-chips">
              <span class="ps-chip">🎂 ${p.born || '—'}</span>
              <span class="ps-chip">📏 ${p.h || '—'}</span>
              <span class="ps-chip">🌍 ${teamName}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="ps-body">
        <div class="ps-section-label">ÉQUIPE NATIONALE</div>
        <div class="ps-nat-grid">
          <div class="ps-nat-box"><div class="ps-nat-val">${p.caps}</div><div class="ps-nat-lbl">Sélections</div></div>
          <div class="ps-nat-box"><div class="ps-nat-val">${p.goals}</div><div class="ps-nat-lbl">Buts</div></div>
          <div class="ps-nat-box"><div class="ps-nat-val">${p.ast}</div><div class="ps-nat-lbl">Passes D.</div></div>
          <div class="ps-nat-box"><div class="ps-nat-val">${p.goals + p.ast}</div><div class="ps-nat-lbl">Contributions</div></div>
          <div class="ps-nat-box"><div class="ps-nat-val">${gPerM}</div><div class="ps-nat-lbl">Buts/match</div></div>
          <div class="ps-nat-box"><div class="ps-nat-val">${p.debut || '—'}</div><div class="ps-nat-lbl">1ère sél.</div></div>
        </div>
        <div class="ps-bars">
          <div class="ps-bar-row">
            <span class="ps-bar-lbl">Ratio buts</span>
            <div class="ps-bar-track"><div class="ps-bar-fill" style="width:${goalPct}%"></div></div>
            <span class="ps-bar-val">${goalPct}%</span>
          </div>
          <div class="ps-bar-row">
            <span class="ps-bar-lbl">Contribution G+A</span>
            <div class="ps-bar-track"><div class="ps-bar-fill ps-bar-fill--green" style="width:${contribPct}%"></div></div>
            <span class="ps-bar-val">${contribPct}%</span>
          </div>
        </div>
        ${p.bio ? `<div class="ps-bio">${p.bio}</div>` : ''}
        ${clubHtml}
      </div>
    </div>`;

  const tn = teamName.replace(/'/g, "\\'");
  openPanel(html, `<button class="pp-back" onclick="openTeamPanel('${tn}')">← ${teamName}</button>${name}`);
}

function bkGoto(id) {
  const scroller = document.getElementById('bk-scroll');
  const col = scroller?.querySelector(`[data-bk="${id}"]`);
  if (col) scroller.scrollTo({ left: Math.max(col.offsetLeft - 14, 0), behavior: 'smooth' });
}

function koSwitchTab(btn, phaseId) {
  const wrap = btn.closest('.ko-wrap');
  wrap.querySelectorAll('.ko-tab').forEach(b => b.classList.remove('active'));
  wrap.querySelectorAll('.ko-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  wrap.querySelector(`.ko-panel[data-phase="${phaseId}"]`).classList.add('active');
}

function renderKnockout() {
  const container = document.getElementById('knockout-bracket');
  if (!container) return;

  const { firsts, seconds, thirds } = getQualifiedTeams();
  const GR = ['A','B','C','D','E','F','G','H','I','J','K','L'];
  const f = (i) => firsts[i];
  const s = (i) => seconds[i];
  const t = (i) => thirds[i];
  const fl = (i) => `1er Gr.${GR[i]}`;
  const sl = (i) => `2e Gr.${GR[i]}`;
  const tl = () => `Meilleur 3e`;

  const m32 = [
    { a: f(0), la: fl(0), b: t(0), lb: tl() }, { a: s(1), la: sl(1), b: s(2), lb: sl(2) },
    { a: f(4), la: fl(4), b: t(1), lb: tl() }, { a: f(5), la: fl(5), b: t(2), lb: tl() },
    { a: f(2), la: fl(2), b: t(3), lb: tl() }, { a: s(3), la: sl(3), b: s(4), lb: sl(4) },
    { a: f(7), la: fl(7), b: t(4), lb: tl() }, { a: f(8), la: fl(8), b: t(5), lb: tl() },
    { a: f(1), la: fl(1), b: t(6), lb: tl() }, { a: s(5), la: sl(5), b: s(6), lb: sl(6) },
    { a: f(3), la: fl(3), b: t(7), lb: tl() }, { a: s(7), la: sl(7), b: s(8), lb: sl(8) },
    { a: f(6), la: fl(6), b: s(0), lb: sl(0) }, { a: f(9), la: fl(9), b: s(10), lb: sl(10) },
    { a: f(10), la: fl(10), b: s(9), lb: sl(9) }, { a: f(11), la: fl(11), b: s(11), lb: sl(11) }
  ];

  const renderKOTeam = (team, label, winner = false) => {
    const src = team ? getFlagImg(team.code) : null;
    const flagHtml = src
      ? `<img src="${src}" class="ko-team-img" alt="">`
      : `<span class="ko-team-emoji">${team ? team.flag : '🏳️'}</span>`;
    return `
      <div class="ko-team ${!team ? 'ko-tbd' : ''} ${winner ? 'ko-winner' : ''}">
        <div class="ko-flag-wrap">${flagHtml}</div>
        <span class="ko-team-name">${team ? team.name : label}</span>
        ${winner ? '<span class="ko-winner-dot"></span>' : ''}
      </div>`;
  };

  const renderKOMatch = (t1, la, t2, lb, phaseClass = '') => `
    <div class="ko-match ${phaseClass}">
      ${renderKOTeam(t1, la)}
      <div class="ko-vs">VS</div>
      ${renderKOTeam(t2, lb)}
    </div>`;

  // Panneau "Groupes" (style FIFA) : mini-classements des 12 groupes
  const groupsPanelHtml = `<div class="ko-grp-grid">${GROUPS.map(g => {
    const st = getGroupStandings(g.id);
    return `
      <div class="ko-grp-card" onclick="openGroupPanel('${g.id}')">
        <div class="ko-grp-head"><span>Groupe ${g.id}</span><span>PTS</span></div>
        ${st.map((t, i) => {
          const code = g.teams.find(tt => tt.name === t.name)?.code || t.name;
          return `<div class="ko-grp-row ${i < 2 ? 'q' : ''}">
            <span class="ko-grp-rank">${i + 1}</span>
            <span class="ko-grp-flag">${t.flag}</span>
            <span class="ko-grp-name">${code}</span>
            <span class="ko-grp-pts">${t.pts}</span>
          </div>`;
        }).join('')}
      </div>`;
  }).join('')}</div>`;

  const phases = [
    { id: 'pg',   label: 'Groupes',      icon: '▤', cls: 'ko-pg',   cols: 0, matches: [] },
    { id: 'r32a', label: '32èmes (1/2)', icon: '⚡', cls: 'ko-r32',  cols: 4, matches: m32.slice(0, 8) },
    { id: 'r32b', label: '32èmes (2/2)', icon: '⚡', cls: 'ko-r32b', cols: 4, matches: m32.slice(8) },
    { id: 'r16',  label: '16èmes',       icon: '🔥', cls: 'ko-r16',  cols: 4, matches: [
      { a: null, la: 'V. M1',  b: null, lb: 'V. M2'  },
      { a: null, la: 'V. M3',  b: null, lb: 'V. M4'  },
      { a: null, la: 'V. M5',  b: null, lb: 'V. M6'  },
      { a: null, la: 'V. M7',  b: null, lb: 'V. M8'  },
      { a: null, la: 'V. M9',  b: null, lb: 'V. M10' },
      { a: null, la: 'V. M11', b: null, lb: 'V. M12' },
      { a: null, la: 'V. M13', b: null, lb: 'V. M14' },
      { a: null, la: 'V. M15', b: null, lb: 'V. M16' },
    ]},
    { id: 'qf', label: 'Quarts',   icon: '💥', cls: 'ko-qf', cols: 2, matches: [
      { a: null, la: 'V. R16-1', b: null, lb: 'V. R16-2' },
      { a: null, la: 'V. R16-3', b: null, lb: 'V. R16-4' },
      { a: null, la: 'V. R16-5', b: null, lb: 'V. R16-6' },
      { a: null, la: 'V. R16-7', b: null, lb: 'V. R16-8' },
    ]},
    { id: 'sf', label: 'Demis',    icon: '⭐', cls: 'ko-sf', cols: 2, matches: [
      { a: null, la: 'V. QF1', b: null, lb: 'V. QF2' },
      { a: null, la: 'V. QF3', b: null, lb: 'V. QF4' },
    ]},
    { id: 'final', label: '🏆 Finale', icon: '', cls: 'ko-final', cols: 1, matches: [
      { a: null, la: 'Finaliste 1', b: null, lb: 'Finaliste 2' },
    ]},
  ];

  // ── MOBILE : bracket continu style FIFA (colonnes + connecteurs, pan horizontal) ──
  if (window.matchMedia('(max-width: 768px)').matches) {
    const bkTeam = (t, label) => `
      <div class="bk-team ${t ? '' : 'bk-tbd'}">
        ${t ? `<span class="bk-flag">${t.flag}</span><b>${t.code || t.name}</b>` : `<span class="bk-lbl">${label}</span>`}
      </div>`;
    const bkMatch = (m) => `<div class="bk-match">${bkTeam(m.a, m.la)}${bkTeam(m.b, m.lb)}</div>`;
    const bkPairs = (ms) => {
      const out = [];
      for (let j = 0; j < ms.length; j += 2) {
        out.push(`<div class="bk-pair">${bkMatch(ms[j])}${ms[j + 1] ? bkMatch(ms[j + 1]) : ''}</div>`);
      }
      return out.join('');
    };

    const r16m = phases.find(p => p.id === 'r16').matches;
    const qfm  = phases.find(p => p.id === 'qf').matches;
    const sfm  = phases.find(p => p.id === 'sf').matches;
    const fm   = phases.find(p => p.id === 'final').matches;

    const colGroups = `<div class="bk-col bk-col-groups" data-bk="pg">${GROUPS.map(g => {
      const st = getGroupStandings(g.id);
      return `<div class="ko-grp-card" onclick="openGroupPanel('${g.id}')">
        <div class="ko-grp-head"><span>Groupe ${g.id}</span><span>PTS</span></div>
        ${st.map((t, idx) => {
          const code = g.teams.find(tt => tt.name === t.name)?.code || t.name;
          return `<div class="ko-grp-row ${idx < 2 ? 'q' : ''}">
            <span class="ko-grp-rank">${idx + 1}</span>
            <span class="ko-grp-flag">${t.flag}</span>
            <span class="ko-grp-name">${code}</span>
            <span class="ko-grp-pts">${t.pts}</span>
          </div>`;
        }).join('')}
      </div>`;
    }).join('')}</div>`;

    const stages = [['pg','PG'], ['r32','32es'], ['r16','16es'], ['qf','QF'], ['sf','DF'], ['f','F']];
    const bkTabs = `<div class="ko-tabs bk-tabs">${stages.map(([id, l], i) =>
      `<button class="ko-tab ${i === 0 ? 'active' : ''}" data-bk-tab="${id}" onclick="bkGoto('${id}')">${l}</button>`).join('')}</div>`;

    container.innerHTML = `
      <div class="ko-wrap bk-wrap">
        ${bkTabs}
        <div class="bk-scroll" id="bk-scroll">
          <div class="bk-scene">
            ${colGroups}
            <div class="bk-col" data-bk="r32">${bkPairs(m32)}</div>
            <div class="bk-col" data-bk="r16">${bkPairs(r16m)}</div>
            <div class="bk-col" data-bk="qf">${bkPairs(qfm)}</div>
            <div class="bk-col" data-bk="sf">${bkPairs(sfm)}</div>
            <div class="bk-col bk-col-final" data-bk="f">${bkMatch(fm[0])}</div>
          </div>
        </div>
      </div>`;

    // tab actif suit le scroll
    const scroller = document.getElementById('bk-scroll');
    scroller.addEventListener('scroll', () => {
      clearTimeout(scroller._t);
      scroller._t = setTimeout(() => {
        const cols = [...scroller.querySelectorAll('[data-bk]')];
        const sl = scroller.scrollLeft + 50;
        let cur = cols[0];
        cols.forEach(c => { if (c.offsetLeft <= sl) cur = c; });
        document.querySelectorAll('.bk-tabs .ko-tab').forEach(t =>
          t.classList.toggle('active', t.dataset.bkTab === cur.dataset.bk));
      }, 80);
    }, { passive: true });
    return;
  }

  const tabsHtml = phases.map((ph, i) => `
    <button class="ko-tab ${i === 0 ? 'active' : ''}" onclick="koSwitchTab(this, '${ph.id}')"
      data-phase="${ph.id}">
      ${ph.icon ? ph.icon + ' ' : ''}${ph.label}
    </button>`).join('');

  const panelsHtml = phases.map((ph, i) => `
    <div class="ko-panel ${i === 0 ? 'active' : ''}" data-phase="${ph.id}">
      ${ph.id === 'pg' ? groupsPanelHtml : `
      <div class="ko-phase-grid ko-cols-${ph.cols}">
        ${ph.matches.map(m => renderKOMatch(m.a, m.la, m.b, m.lb, ph.cls)).join('')}
      </div>`}
    </div>`).join('');

  container.innerHTML = `
    <div class="ko-wrap">
      <div class="ko-tabs">${tabsHtml}</div>
      <div class="ko-panels">${panelsHtml}</div>
    </div>`;

  // Mobile : swipe gauche/droite → étape précédente/suivante
  const koWrap = container.querySelector('.ko-wrap');
  if (koWrap && window.matchMedia('(max-width: 768px)').matches) {
    let _kx = 0, _ky = 0;
    koWrap.addEventListener('touchstart', e => { _kx = e.touches[0].clientX; _ky = e.touches[0].clientY; }, { passive: true });
    koWrap.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - _kx;
      const dy = e.changedTouches[0].clientY - _ky;
      if (Math.abs(dx) < 70 || Math.abs(dy) > 60) return;
      const tabs = [...koWrap.querySelectorAll('.ko-tab')];
      const cur = tabs.findIndex(t => t.classList.contains('active'));
      const nxt = dx < 0 ? cur + 1 : cur - 1;
      if (nxt >= 0 && nxt < tabs.length) {
        tabs[nxt].click();
        tabs[nxt].scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
      }
    }, { passive: true });
  }
}
