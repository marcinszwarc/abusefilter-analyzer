text := 'Pchnąć w tę łódź jeża lub ośm skrzyń fig';
text rlike '\błódź\b' &
text irlike '\bŁÓDŹ\b' &
text rlike 'Pch\w+ w' &
!(text rlike 'o\Wm') &
'٣' rlike '\d'
