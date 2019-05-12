import React from 'react';

const Instruction = () => {
    return (
        <div>
            <h1 style={{color: '#124191'}}>Instrukcja</h1>
            <ul className="col-7">
                <li className="m-2">Zainstaluj program do analizy dostępny pod <a href="http://google.com">tym linkiem</a></li>
                <li className="m-2">Uruchom program do analizy upewniając się najpierw, czy do komputera podłączona jest kamera</li>
                <li className="m-2">Na ekranie powinien wyświetlić się podgląd z kamery. Program jest już gotowy do analizy.</li>
                <li className="m-2">Umieść twarz w kadrze tak, żeby wokół twojej głowy pojawił się prostokąt. 
                    Oznacza to, że program wykrył twoją twarz. </li>
                <li className="m-2">Pomiar emocji rozpocznie się automatycznie po wykryciu twarzy. 
                    Wyniki pojawią się w panelu po lewej stronie, przyporządkowując do każdej z 
                    siedmiu podstawowych emocji procentową pewność jej wykrycia.</li>
                <li className="m-2">Aby rozpocząć pomiar pulsu naciśnij przycisk "Dokonaj pomiaru". 
                    Pozostań nieruchomo dopóki program wyświetla polecenie "Czekaj". 
                    Po dokonaniu pomiaru wynik pojawi się w panelu po lewej stronie.</li>
                <li className="m-2">Aby zapisać wyniki zaloguj się korzystając z formularza w panelu po lewej stronie. 
                    Pamiętaj, że dopóki nie jesteś zalogowany żadne wyniki nie są zapisywane.</li>
            </ul>
        </div>
    )
}

export default Instruction;