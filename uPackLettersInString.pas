//
// uPackLettersInString.pas
// (C) 2022 Ivan Cherednichenko. All Rights Reserved.
//

unit uPackLettersInString;

interface

uses
  System.SysUtils, System.StrUtils, System.Character;

/// <summary>Pack string.</summary>
/// <example>PackLetterInString('AAABBCCDDDEEF') --> 'A3B2C2D3E2F'</example>
function PackLettersInString(const S: string): string;

/// <summary>Unpack string which packed by packLettersInString() function.</summary>
/// <example>UnpackLettersInString('A3B2C2D3E2FF') --> 'AAABBCCDDDEE'</example>
function UnpackLettersInString(const S: string): string;

{.define CHE_TEST_ME}

{$ifdef DEBUG or CHE_TEST_ME}
  function PackLettersInStringTest(): string;
  function UnpackLettersInStringTest(): string;
{$endif DEBUG or CHE_TEST_ME}

implementation

function PackLettersInString(const S: string): string;
var
  I: Integer;
  LChar: Char;
  LArr: TArray<string>;
begin
  Result := '';
  if Length(S) = 0 then
    Exit;

  // Cycle converts string like 'AAABBCD' to ',AAA,BB,C,D'.
  LChar := #0;
  for I := Low(S) to High(S) do
  begin
    if (S[I] <> LChar) then
      Result := Result + ',';

    Result := Result + S[I];
    LChar := S[I];
  end;  // for I..
//  Result := Result.TrimLeft([',']);  // What is faster TrimLeft or Delete?
  Delete(Result, Low(Result), 1);

  LArr := Result.Split([',']);

  Result := '';
  for I := Low(LArr) to High(LArr) do
    Result := Result + LArr[I][Low(string)] + IfThen(Length(LArr[I]) > 1, Length(LArr[I]).ToString(), '');
end;

function UnpackLettersInString(const S: string): string;
var
  I, LCount: Integer;
  LArr: TArray<string>;
  LChar: Char;
begin
  Result := '';
  if Length(S) = 0 then
    Exit;

  // Cycle converts string like 'A10B2C13DE2' to 'A,10,B,2,C,13,D,1,E,2,'.
  for I := Low(S) to High(S) do
  begin
    if (S[I].IsNumber()) then
    begin
      Result := Result + S[I] + IfThen((I <> High(S)) and (S[I + 1].IsNumber()), '', ',');
      Continue;
    end;  // if

    Result := Result + S[I] + ',' + IfThen((I <> High(S)) and (S[I + 1].IsLetter()), '1,', '');
  end;  // for I..
//  Result := Result.TrimRight([',']);  // What is faster TrimRight or Delete?
  Delete(Result, High(Result), 1);

  if not Result[High(Result)].IsNumber() then
    Result := Result + '1';

  LArr := Result.Split([',']);

  LCount := 0;
  LChar := #0;
  Result := '';
  for I := Low(LArr) to High(LArr) do
  begin
    if LArr[I][Low(string)].IsLetter() then
      LChar := LArr[I][Low(string)]
    else
      LCount := StrToInt(LArr[I]);

    if (I = High(LArr)) and (LCount = 0) then
      LCount := 1;

    if (LChar <> #0) and (LCount <> 0) then
    begin
      Result := Result + DupeString(LChar, LCount);
      LCount := 0;
    end;  // if
  end;  // for I..
end;

{$ifdef DEBUG or CHE_TEST_ME}
  function TestString(const S, Valid: string; const AddLineBreak: Boolean = True): string;
  begin
    Result := S + IfThen(S = Valid, '=', '<>') + Valid + IfThen(AddLineBreak, sLineBreak, '');
  end;

  function PackLettersInStringTest(): string;
  begin
    Result :=
        TestString(PackLettersInString('AAA'), 'A3') +
        TestString(PackLettersInString('AAABB'), 'A3B2') +
        TestString(PackLettersInString('AAABBCD'), 'A3B2CD') +
        TestString(PackLettersInString('AAABBCCDEEFFFFFG'), 'A3B2C2DE2F5G') +
        TestString(PackLettersInString('AAABBCCDEEFFFFFGG'), 'A3B2C2DE2F5G2') +
        TestString(PackLettersInString('AAABBCCDEEFFFFFGGG'), 'A3B2C2DE2F5G3') +
        '';
  end;

  function UnpackLettersInStringTest(): string;
  begin
    Result :=
        TestString(UnpackLettersInString('A3'), 'AAA') +
        TestString(UnpackLettersInString('A10'), 'AAAAAAAAAA') +
        TestString(UnpackLettersInString('A3B2'), 'AAABB') +
        TestString(UnpackLettersInString('A3B2CD'), 'AAABBCD') +
        TestString(UnpackLettersInString('A3B2C2DE2F5G'), 'AAABBCCDEEFFFFFG') +
        TestString(UnpackLettersInString('A3B2C2DE2F5G2'), 'AAABBCCDEEFFFFFGG') +
        TestString(UnpackLettersInString('A3B2C2DE2F5G3'), 'AAABBCCDEEFFFFFGGG') +
        TestString(UnpackLettersInString('ABABAB'), 'ABABAB') +
        '';
  end;
{$endif DEBUG or CHE_TEST_ME}

end.
